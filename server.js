import express from "express";
import cors from "cors";
import pkg from "pg";
import rateLimit from "express-rate-limit";
import cron from "node-cron";
import * as Sentry from "@sentry/node";
import { existsSync, readFileSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0),
  });
}

const newsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: Number(process.env.NEWS_RATE_LIMIT_MAX || 100),
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(["/news", "/api/news"], newsLimiter);

app.use((req, res, next) => {
  if (req.method === "GET" && (req.path === "/news" || req.path.startsWith("/news/") || req.path === "/api/news" || req.path.startsWith("/api/news/"))) {
    res.set("Cache-Control", "public, max-age=300");
  }
  next();
});

app.use((error, req, res, next) => {
  if (process.env.SENTRY_DSN) {
    Sentry.captureException(error);
  }

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  return next(error);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fallbackFile = path.join(__dirname, "news-fallback.json");
const DEPLOY_MARKER = "health-db-fix-2026-03-10";
let newsRefreshState = {
  updatedAt: null,
  source: "startup",
  count: 0,
};

function loadLocalEnvFile() {
  const candidates = [
    path.join(process.cwd(), ".env"),
    path.join(__dirname, ".env"),
  ];

  const envPath = candidates.find((candidate) => existsSync(candidate));
  if (!envPath) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalIndex = trimmed.indexOf("=");
    if (equalIndex <= 0) {
      continue;
    }

    const key = trimmed.slice(0, equalIndex).trim();
    if (!key || process.env[key] !== undefined) {
      continue;
    }

    let value = trimmed.slice(equalIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

// Render injects env vars directly; this only helps local runs with a .env file.
loadLocalEnvFile();

const dbUrl = process.env.DATABASE_URL || "";
const isLocalDb = /localhost|127\.0\.0\.1/.test(dbUrl);

function maskDatabaseUrl(url) {
  if (!url) {
    return "(not set)";
  }

  return url.replace(/:\/\/([^:]+):([^@]+)@/, "://$1:***@");
}

console.log("DATABASE URL:", maskDatabaseUrl(dbUrl));

// Use SSL for hosted databases, but not for local Postgres by default.
const pool = new Pool({
  connectionString: dbUrl,
  ssl: isLocalDb
    ? false
    : {
        require: true,
        rejectUnauthorized: false,
      }
});

async function readFallbackNews() {
  try {
    const raw = await readFile(fallbackFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFallbackNews(news) {
  await writeFile(fallbackFile, JSON.stringify(news, null, 2), "utf8");
}

function canUseFallback(error) {
  return ["ECONNREFUSED", "ENOTFOUND", "3D000", "28P01"].includes(error?.code);
}

function sendJsonWithSource(res, source, payload) {
  res.set("X-Data-Source", source);
  return res.json(payload);
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

const languageAliasMap = {
  en: "en",
  english: "en",
  hi: "hi",
  hindi: "hi",
  te: "te",
  telugu: "te",
  fr: "fr",
  french: "fr",
  es: "es",
  spanish: "es",
  de: "de",
  german: "de",
  ar: "ar",
  arabic: "ar",
  ta: "ta",
  tamil: "ta",
  kn: "kn",
  kannada: "kn",
  ml: "ml",
  malayalam: "ml",
  bn: "bn",
  bengali: "bn",
  gu: "gu",
  gujarati: "gu",
  pa: "pa",
  punjabi: "pa",
  mr: "mr",
  marathi: "mr",
};

function canonicalLanguage(value) {
  const normalized = normalizeText(value).toLowerCase();
  return languageAliasMap[normalized] || normalized;
}

function detectLanguageFromHeaders(headers) {
  const acceptLanguage = normalizeText(headers?.["accept-language"]).toLowerCase();
  if (!acceptLanguage) {
    return "";
  }

  const primary = acceptLanguage.split(",")[0] || "";
  const langCode = primary.split("-")[0] || "";
  if (!/^[a-z]{2}$/.test(langCode)) {
    return "";
  }
  return canonicalLanguage(langCode);
}

function validateNewsPayload(body) {
  const normalized = {
    category: normalizeText(body?.category),
    title: normalizeText(body?.title),
    description: normalizeText(body?.description),
    content: normalizeText(body?.content),
    language: normalizeText(body?.language),
    location: normalizeText(body?.location),
    time: normalizeText(body?.time),
  };

  if (!normalized.title) {
    return { ok: false, error: "'title' is required" };
  }

  if (!normalized.category) {
    return { ok: false, error: "'category' is required" };
  }

  return { ok: true, data: normalized };
}

function parseListParams(query, headers = {}) {
  const pageRaw = Number(query?.page || 1);
  const limitRaw = Number(query?.limit || 20);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;
  const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(Math.floor(limitRaw), 100) : 20;
  const detectedLanguage = detectLanguageFromHeaders(headers);
  const requestedLanguage = normalizeText(query?.language || query?.lang);

  return {
    page,
    limit,
    q: normalizeText(query?.q).toLowerCase(),
    category: normalizeText(query?.category).toLowerCase(),
    language: canonicalLanguage(requestedLanguage || detectedLanguage),
    location: normalizeText(query?.location).toLowerCase(),
  };
}

function applyNewsFilters(news, params) {
  let filtered = [...news].sort((a, b) => Number(b.id) - Number(a.id));

  if (params.category) {
    filtered = filtered.filter((item) => normalizeText(item?.category).toLowerCase() === params.category);
  }

  if (params.language) {
    filtered = filtered.filter((item) => canonicalLanguage(item?.language) === params.language);
  }

  if (params.location) {
    filtered = filtered.filter((item) => normalizeText(item?.location).toLowerCase().includes(params.location));
  }

  if (params.q) {
    filtered = filtered.filter((item) => {
      const haystack = [
        normalizeText(item?.title),
        normalizeText(item?.description),
        normalizeText(item?.content),
      ].join(" ").toLowerCase();
      return haystack.includes(params.q);
    });
  }

  const total = filtered.length;
  const start = (params.page - 1) * params.limit;
  const data = filtered.slice(start, start + params.limit);

  return {
    data,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      hasNext: start + params.limit < total,
      hasPrev: params.page > 1,
    },
  };
}

function extractItemDate(item) {
  const candidates = [item?.created_at, item?.updated_at, item?.time];
  for (const candidate of candidates) {
    const asDate = new Date(candidate);
    if (!Number.isNaN(asDate.getTime())) {
      return asDate;
    }
  }
  return null;
}

function computeTrendingScore(item) {
  const views = Number(item?.views) || 0;
  const shares = Number(item?.shares) || 0;
  const likes = Number(item?.likes) || 0;
  const comments = Number(item?.comments) || 0;
  const engagementScore = views + (shares * 4) + (likes * 2) + (comments * 3);

  const articleDate = extractItemDate(item);
  const hoursSincePublish = articleDate ? Math.max(0, (Date.now() - articleDate.getTime()) / (1000 * 60 * 60)) : 72;
  const recencyScore = Math.max(0, 240 - hoursSincePublish);

  return Number((engagementScore + recencyScore).toFixed(2));
}

function applyTrending(news, params) {
  const filtered = applyNewsFilters(news, params).data;
  const ranked = filtered
    .map((item) => ({
      ...item,
      trendingScore: computeTrendingScore(item),
    }))
    .sort((a, b) => b.trendingScore - a.trendingScore);

  const total = ranked.length;
  const start = (params.page - 1) * params.limit;
  const data = ranked.slice(start, start + params.limit);

  return {
    data,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      hasNext: start + params.limit < total,
      hasPrev: params.page > 1,
    },
  };
}

async function refreshNewsCache() {
  try {
    const result = await pool.query("SELECT * FROM news ORDER BY id DESC LIMIT 500");
    newsRefreshState = {
      updatedAt: new Date().toISOString(),
      source: "database",
      count: result.rows.length,
    };
  } catch (dbError) {
    if (canUseFallback(dbError)) {
      const fallback = await readFallbackNews();
      newsRefreshState = {
        updatedAt: new Date().toISOString(),
        source: "fallback",
        count: fallback.length,
      };
      return;
    }

    if (process.env.SENTRY_DSN) {
      Sentry.captureException(dbError);
    }
  }
}

// Root test route
app.get("/", (req, res) => {
  res.send(`NEWS ROBO API RUNNING (${DEPLOY_MARKER})`);
});

// Health check route
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      ok: true,
      database: "connected",
      refresh: newsRefreshState,
      now: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      database: "disconnected",
      error: err.message,
    });
  }
});

// Get all news
app.get("/news", async (req, res) => {
  const params = parseListParams(req.query, req.headers);

  try {
    const result = await pool.query(
      "SELECT * FROM news ORDER BY id DESC"
    );
    const payload = applyNewsFilters(result.rows, params);
    return sendJsonWithSource(res, "database", payload);
  } catch (error) {
    if (canUseFallback(error)) {
      const news = await readFallbackNews();
      const payload = applyNewsFilters(news, params);
      return sendJsonWithSource(res, "fallback", payload);
    }

    console.error("GET /news DB error:", error.code, error.message);
    const message = process.env.NODE_ENV === "production"
      ? "Database error"
      : `Database error: ${error.code || "UNKNOWN"} ${error.message}`;
    if (process.env.SENTRY_DSN) {
      Sentry.captureException(error);
    }
    res.status(500).send(message);
  }
});

// Search news alias endpoint
app.get("/news/search", async (req, res) => {
  return redirectToNewsPath(req, res, "/news");
});

// Trending news endpoint
app.get("/news/trending", async (req, res) => {
  const params = parseListParams(req.query, req.headers);

  try {
    const result = await pool.query("SELECT * FROM news ORDER BY id DESC");
    const payload = applyTrending(result.rows, params);
    return sendJsonWithSource(res, "database", payload);
  } catch (error) {
    if (canUseFallback(error)) {
      const news = await readFallbackNews();
      const payload = applyTrending(news, params);
      return sendJsonWithSource(res, "fallback", payload);
    }

    if (process.env.SENTRY_DSN) {
      Sentry.captureException(error);
    }

    const message = process.env.NODE_ENV === "production"
      ? "Database error"
      : `Database error: ${error.code || "UNKNOWN"} ${error.message}`;
    return res.status(500).send(message);
  }
});

// Get single news article
app.get("/news/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "SELECT * FROM news WHERE id=$1",
      [id]
    );

    return sendJsonWithSource(res, "database", result.rows[0] || null);
  } catch (error) {
    if (canUseFallback(error)) {
      const id = req.params.id;
      const news = await readFallbackNews();
      const article = news.find((item) => String(item.id) === String(id));
      return sendJsonWithSource(res, "fallback", article || null);
    }

    console.error("GET /news/:id DB error:", error.code, error.message);
    const message = process.env.NODE_ENV === "production"
      ? "Database error"
      : `Database error: ${error.code || "UNKNOWN"} ${error.message}`;
    res.status(500).send(message);
  }
});

// Add news (Admin use)
app.post("/news", async (req, res) => {
  const payloadCheck = validateNewsPayload(req.body);
  if (!payloadCheck.ok) {
    return res.status(400).json({ error: payloadCheck.error });
  }

  try {
    const {
      category,
      title,
      description,
      content,
      language,
      location,
      time
    } = payloadCheck.data;

    const result = await pool.query(
      `INSERT INTO news 
      (category,title,description,content,language,location,time)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [category, title, description, content, language, location, time]
    );

    return sendJsonWithSource(res, "database", result.rows[0]);
  } catch (error) {
    if (canUseFallback(error)) {
      const news = await readFallbackNews();
      const maxId = news.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0);
      const newItem = {
        id: maxId + 1,
        ...payloadCheck.data,
        created_at: new Date().toISOString(),
      };
      news.push(newItem);
      await writeFallbackNews(news);
      return sendJsonWithSource(res, "fallback", newItem);
    }

    console.error("POST /news DB error:", error.code, error.message);
    const message = process.env.NODE_ENV === "production"
      ? "Database insert error"
      : `Database insert error: ${error.code || "UNKNOWN"} ${error.message}`;
    res.status(500).send(message);
  }
});

// Update news
app.put("/news/:id", async (req, res) => {
  const payloadCheck = validateNewsPayload(req.body);
  if (!payloadCheck.ok) {
    return res.status(400).json({ error: payloadCheck.error });
  }

  try {
    const { id } = req.params;
    const {
      category,
      title,
      description,
      content,
      language,
      location,
      time
    } = payloadCheck.data;

    const result = await pool.query(
      `UPDATE news
       SET category=$1,title=$2,description=$3,content=$4,language=$5,location=$6,time=$7
       WHERE id=$8
       RETURNING *`,
      [category, title, description, content, language, location, time, id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ error: "News item not found" });
    }

    return sendJsonWithSource(res, "database", result.rows[0]);
  } catch (error) {
    if (canUseFallback(error)) {
      const { id } = req.params;
      const news = await readFallbackNews();
      const index = news.findIndex((item) => String(item.id) === String(id));

      if (index === -1) {
        return res.status(404).json({ error: "News item not found" });
      }

      const updated = {
        ...news[index],
        ...payloadCheck.data,
        id: news[index].id,
        updated_at: new Date().toISOString(),
      };
      news[index] = updated;
      await writeFallbackNews(news);
      return sendJsonWithSource(res, "fallback", updated);
    }

    console.error("PUT /news/:id DB error:", error.code, error.message);
    const message = process.env.NODE_ENV === "production"
      ? "Database update error"
      : `Database update error: ${error.code || "UNKNOWN"} ${error.message}`;
    return res.status(500).send(message);
  }
});

// Delete news
app.delete("/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM news WHERE id=$1 RETURNING *",
      [id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ error: "News item not found" });
    }

    return sendJsonWithSource(res, "database", result.rows[0]);
  } catch (error) {
    if (canUseFallback(error)) {
      const { id } = req.params;
      const news = await readFallbackNews();
      const index = news.findIndex((item) => String(item.id) === String(id));

      if (index === -1) {
        return res.status(404).json({ error: "News item not found" });
      }

      const [deleted] = news.splice(index, 1);
      await writeFallbackNews(news);
      return sendJsonWithSource(res, "fallback", deleted);
    }

    console.error("DELETE /news/:id DB error:", error.code, error.message);
    const message = process.env.NODE_ENV === "production"
      ? "Database delete error"
      : `Database delete error: ${error.code || "UNKNOWN"} ${error.message}`;
    return res.status(500).send(message);
  }
});

function redirectToNewsPath(req, res, targetPath) {
  const queryString = new URLSearchParams(req.query || {}).toString();
  const destination = queryString ? `${targetPath}?${queryString}` : targetPath;
  return res.redirect(307, destination);
}

// API prefix compatibility aliases (e.g. /api/news -> /news)
app.get("/api", (req, res) => {
  return res.json({
    ok: true,
    message: "NEWS ROBO API",
    routes: ["/news", "/health", "/health/db"],
  });
});

app.get("/api/news", (req, res) => redirectToNewsPath(req, res, "/news"));
app.get("/api/news/search", (req, res) => redirectToNewsPath(req, res, "/news/search"));
app.get("/api/news/trending", (req, res) => redirectToNewsPath(req, res, "/news/trending"));
app.get("/api/news/:id", (req, res) => redirectToNewsPath(req, res, `/news/${req.params.id}`));
app.post("/api/news", (req, res) => redirectToNewsPath(req, res, "/news"));
app.put("/api/news/:id", (req, res) => redirectToNewsPath(req, res, `/news/${req.params.id}`));
app.delete("/api/news/:id", (req, res) => redirectToNewsPath(req, res, `/news/${req.params.id}`));

// Health check endpoint
app.get("/health/db", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      ok: true,
      database: "connected",
      now: new Date().toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      database: "error",
      error: err.message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`NEWS ROBO API running on port ${PORT}`);

  // Quick startup probe to clarify active data mode in logs.
  pool.query("SELECT 1")
    .then(() => console.log("DATA MODE: database"))
    .catch(() => console.log("DATA MODE: fallback"));

  void refreshNewsCache();

  cron.schedule("*/10 * * * *", () => {
    void refreshNewsCache();
  });
});

server.on("error", (error) => {
  if (error?.code === "EADDRINUSE") {
    console.log(`Port ${PORT} is already in use. API is likely already running.`);
    process.exit(0);
    return;
  }

  console.error("Server startup error:", error);
  process.exit(1);
});
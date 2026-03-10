import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pkg from "pg";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  return next(error);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fallbackFile = path.join(__dirname, "news-fallback.json");

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

function parseListParams(query) {
  const pageRaw = Number(query?.page || 1);
  const limitRaw = Number(query?.limit || 20);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;
  const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(Math.floor(limitRaw), 100) : 20;

  return {
    page,
    limit,
    q: normalizeText(query?.q).toLowerCase(),
    category: normalizeText(query?.category).toLowerCase(),
    language: normalizeText(query?.language).toLowerCase(),
    location: normalizeText(query?.location).toLowerCase(),
  };
}

function applyNewsFilters(news, params) {
  let filtered = [...news].sort((a, b) => Number(b.id) - Number(a.id));

  if (params.category) {
    filtered = filtered.filter((item) => normalizeText(item?.category).toLowerCase() === params.category);
  }

  if (params.language) {
    filtered = filtered.filter((item) => normalizeText(item?.language).toLowerCase() === params.language);
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

// Root test route
app.get("/", (req, res) => {
  res.send("NEWS ROBO API RUNNING");
});

// Health check route
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      ok: true,
      database: "connected",
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

// Health check route
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

// Get all news
app.get("/news", async (req, res) => {
  const params = parseListParams(req.query);

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
    res.status(500).send(message);
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

// Start server
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`NEWS ROBO API running on port ${PORT}`);

  // Quick startup probe to clarify active data mode in logs.
  pool.query("SELECT 1")
    .then(() => console.log("DATA MODE: database"))
    .catch(() => console.log("DATA MODE: fallback"));
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
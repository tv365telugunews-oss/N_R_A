import OpenAI from "openai";

const aiEnabled = Boolean(process.env.OPENAI_API_KEY);
const openai = aiEnabled
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const summaryCache = new Map();
const headlineCache = new Map();

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function summarizeHeuristic(text) {
  const normalized = normalizeText(text);
  if (!normalized) {
    return "";
  }

  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (sentences.length > 0) {
    return sentences.join(" ");
  }

  return normalized.slice(0, 220);
}

function shortenHeadlineHeuristic(title) {
  const normalized = normalizeText(title);
  if (!normalized) {
    return "";
  }

  if (normalized.length <= 72) {
    return normalized;
  }

  return `${normalized.slice(0, 69)}...`;
}

async function summarizeWithAi(text) {
  if (!openai) {
    return summarizeHeuristic(text);
  }

  try {
    const result = await openai.chat.completions.create({
      model: process.env.OPENAI_SUMMARY_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Summarize news articles in 2 concise sentences.",
        },
        {
          role: "user",
          content: normalizeText(text),
        },
      ],
      temperature: 0.2,
      max_tokens: 120,
    });

    return normalizeText(result.choices?.[0]?.message?.content) || summarizeHeuristic(text);
  } catch {
    return summarizeHeuristic(text);
  }
}

async function rewriteHeadlineWithAi(title) {
  if (!openai) {
    return shortenHeadlineHeuristic(title);
  }

  try {
    const result = await openai.chat.completions.create({
      model: process.env.OPENAI_HEADLINE_MODEL || process.env.OPENAI_SUMMARY_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Rewrite this news headline to be shorter and clearer. Keep facts unchanged.",
        },
        {
          role: "user",
          content: normalizeText(title),
        },
      ],
      temperature: 0.1,
      max_tokens: 40,
    });

    return normalizeText(result.choices?.[0]?.message?.content) || shortenHeadlineHeuristic(title);
  } catch {
    return shortenHeadlineHeuristic(title);
  }
}

function articleCacheKey(article) {
  const id = article?.id ?? "unknown";
  const updated = normalizeText(article?.updated_at) || normalizeText(article?.created_at) || normalizeText(article?.time) || "none";
  return `${id}::${updated}`;
}

export async function enrichArticleWithAi(article) {
  if (!article) {
    return article;
  }

  const key = articleCacheKey(article);
  const title = normalizeText(article.title);
  const content = normalizeText(article.content || article.description || "");

  if (!summaryCache.has(key)) {
    summaryCache.set(key, await summarizeWithAi(content || title));
  }
  if (!headlineCache.has(key)) {
    headlineCache.set(key, await rewriteHeadlineWithAi(title));
  }

  return {
    ...article,
    summary: summaryCache.get(key) || "",
    shortHeadline: headlineCache.get(key) || title,
  };
}

export async function enrichNewsBatchWithAi(articles, maxAiItems = 10) {
  const safeArticles = Array.isArray(articles) ? articles : [];
  if (!safeArticles.length) {
    return [];
  }

  const maxItems = Number.isFinite(maxAiItems) ? Math.max(0, Math.floor(maxAiItems)) : 10;
  const aiSlice = safeArticles.slice(0, maxItems);
  const tail = safeArticles.slice(maxItems);

  const enrichedHead = await Promise.all(aiSlice.map((article) => enrichArticleWithAi(article)));
  const enrichedTail = tail.map((article) => ({
    ...article,
    summary: summarizeHeuristic(normalizeText(article.content || article.description || article.title || "")),
    shortHeadline: shortenHeadlineHeuristic(normalizeText(article.title || "")),
  }));

  return [...enrichedHead, ...enrichedTail];
}

export function clusterNewsByTopic(articles) {
  const clusters = {};

  for (const article of articles || []) {
    const title = normalizeText(article?.title).toLowerCase();
    const topic = (title.split(/\s+/)[0] || "general").replace(/[^a-z0-9]/g, "") || "general";

    if (!clusters[topic]) {
      clusters[topic] = {
        topic,
        items: [],
      };
    }

    clusters[topic].items.push(article);
  }

  return Object.values(clusters).sort((a, b) => b.items.length - a.items.length);
}

export function personalizeNews(articles, preferences) {
  const topics = Array.isArray(preferences?.topics)
    ? preferences.topics.map((t) => normalizeText(t).toLowerCase()).filter(Boolean)
    : [];

  const preferredLanguage = normalizeText(preferences?.language).toLowerCase();

  return [...(articles || [])].sort((a, b) => {
    const titleA = normalizeText(a?.title).toLowerCase();
    const titleB = normalizeText(b?.title).toLowerCase();
    const langA = normalizeText(a?.language).toLowerCase();
    const langB = normalizeText(b?.language).toLowerCase();

    const topicScoreA = topics.some((topic) => titleA.includes(topic)) ? 1 : 0;
    const topicScoreB = topics.some((topic) => titleB.includes(topic)) ? 1 : 0;
    const languageScoreA = preferredLanguage && langA === preferredLanguage ? 1 : 0;
    const languageScoreB = preferredLanguage && langB === preferredLanguage ? 1 : 0;

    const scoreA = topicScoreA + languageScoreA;
    const scoreB = topicScoreB + languageScoreB;

    return scoreB - scoreA;
  });
}

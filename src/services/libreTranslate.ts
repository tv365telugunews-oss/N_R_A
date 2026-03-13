type TranslatableNews = {
  id: string;
  title: string;
  content: string;
  [key: string]: unknown;
};

const LIBRE_TRANSLATE_URL =
  import.meta.env.VITE_TRANSLATE_API_URL || "https://libretranslate.de/translate";

const languageCodeMap: Record<string, string> = {
  English: "en",
  Hindi: "hi",
  Telugu: "te",
  Tamil: "ta",
  Kannada: "kn",
  Malayalam: "ml",
  Bengali: "bn",
  Gujarati: "gu",
  Punjabi: "pa",
  Marathi: "mr",
  Spanish: "es",
  French: "fr",
  German: "de",
  Arabic: "ar",
};

const CACHE_KEY = "newsrobo_translation_cache_v1";
const MAX_CACHE_ITEMS = 800;
const translationCache = new Map<string, string>();
let cacheLoaded = false;

function loadCacheOnce() {
  if (cacheLoaded || typeof window === "undefined") {
    return;
  }
  cacheLoaded = true;

  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw) as Record<string, string>;
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string") {
        translationCache.set(key, value);
      }
    }
  } catch {
    // Ignore cache parsing/storage errors.
  }
}

function persistCache() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const entries = Array.from(translationCache.entries());
    const trimmed = entries.slice(-MAX_CACHE_ITEMS);
    localStorage.setItem(CACHE_KEY, JSON.stringify(Object.fromEntries(trimmed)));
  } catch {
    // Ignore cache persistence errors.
  }
}

function makeCacheKey(text: string, target: string) {
  return `${target}::${text}`;
}

export function getLanguageCode(language: string) {
  return languageCodeMap[language] || language.toLowerCase();
}

async function translateText(text: string, target: string): Promise<string> {
  const normalized = text?.trim();
  if (!normalized || target === "en") {
    return text;
  }

  loadCacheOnce();

  const cacheKey = makeCacheKey(normalized, target);
  const cached = translationCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(LIBRE_TRANSLATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: normalized,
        source: "en",
        target,
        format: "text",
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return text;
    }

    const data = (await response.json()) as { translatedText?: string };
    const translated = data.translatedText || text;

    translationCache.set(cacheKey, translated);
    persistCache();
    return translated;
  } catch {
    return text;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function translateNewsArticles<T extends TranslatableNews>(
  articles: T[],
  targetLanguageCode: string
): Promise<T[]> {
  if (!articles.length || targetLanguageCode === "en") {
    return articles;
  }

  const uniqueTexts = new Set<string>();
  for (const article of articles) {
    if (article.title) {
      uniqueTexts.add(article.title);
    }
    if (article.content) {
      uniqueTexts.add(article.content);
    }
  }

  const translatedByText = new Map<string, string>();
  await Promise.all(
    Array.from(uniqueTexts).map(async (text) => {
      const translated = await translateText(text, targetLanguageCode);
      translatedByText.set(text, translated);
    })
  );

  return articles.map((article) => ({
    ...article,
    title: translatedByText.get(article.title) || article.title,
    content: translatedByText.get(article.content) || article.content,
  }));
}

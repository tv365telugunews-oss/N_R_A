# Deploy Runbook (Render API + Vercel Frontend)

This is the single source of truth for deploying and validating NEWS ROBO.

## 1) Backend API (Render)

Service URL:

https://news-robo-api.onrender.com

Required environment variables (Render -> Settings -> Environment):

PORT=10000
DATABASE_URL=<your_render_postgres_connection_string>

Optional backend hardening variables:

NEWS_RATE_LIMIT_MAX=100
SENTRY_DSN=<your_sentry_dsn>
SENTRY_TRACES_SAMPLE_RATE=0.1
OPENAI_API_KEY=<your_openai_api_key>
OPENAI_SUMMARY_MODEL=gpt-4o-mini
OPENAI_HEADLINE_MODEL=gpt-4o-mini
OPENAI_MAX_ITEMS=10

Backend route checks:

- https://news-robo-api.onrender.com/
- https://news-robo-api.onrender.com/health
- https://news-robo-api.onrender.com/news
- https://news-robo-api.onrender.com/api/news
- https://news-robo-api.onrender.com/news/search?q=news
- https://news-robo-api.onrender.com/news/trending
- https://news-robo-api.onrender.com/news/clusters
- https://news-robo-api.onrender.com/news/feed?topics=ai,technology

Expected:

- Root returns API running message
- /health returns ok true
- /news returns JSON with data and pagination
- /api/news returns same data (compat route)
- /news/search supports text search via q
- /news/trending returns ranked news items
- /news/clusters groups related articles by topic keyword
- /news/feed personalizes ranking using topics + language

Built-in backend protections/features:

- Rate limiting enabled on /news and /api/news
- Cache-Control headers for GET news responses (5 minutes)
- Optional Sentry error capture when SENTRY_DSN is configured
- Scheduled refresh task runs every 10 minutes
- AI enrichment on news responses:
  - summary (2 concise sentences)
  - shortHeadline (clear, shorter headline)

## 2) Frontend API config

Use Vite env variable:

VITE_API_URL=https://news-robo-api.onrender.com

Compatibility variable also supported:

VITE_API_BASE_URL=https://news-robo-api.onrender.com

Optional translation API endpoint:

VITE_TRANSLATE_API_URL=https://libretranslate.de/translate

Frontend code pattern:

fetch(`${import.meta.env.VITE_API_URL}/news`)

## 3) Frontend build

From project root:

npm run build

Output:

- Vite -> dist/

## 4) Frontend deploy (Vercel)

1. Sign in at https://vercel.com with GitHub.
2. New Project -> import this repository.
3. Add env var in Vercel project settings:

VITE_API_URL=https://news-robo-api.onrender.com

4. Deploy.
5. Copy the live URL (example: https://your-app.vercel.app).

## 5) CORS

Already enabled in backend:

- import cors from "cors"
- app.use(cors())

## 6) Verify full system

API only:

npm run verify:deploy

This checks both `/news` and `/api/news`.

It also checks `/news/search` and `/news/trending`.

It also checks `/news/clusters` and `/news/feed`.

API + frontend:

npm run verify:deploy -- --frontend-url https://your-app.vercel.app

Find a live frontend URL from known candidates:

npm run check:frontend

CI automation:

- GitHub Actions workflow `.github/workflows/api-verify.yml` runs API verification on pushes to `main` and on manual dispatch.

## 7) Troubleshooting

Cannot GET /api/news:

- Confirm latest backend commit is deployed on Render.
- Check Render deploy logs.
- Re-run with manual deploy (clear cache once if stale).

Frontend cannot fetch API:

- Confirm VITE_API_URL is set in frontend host.
- Confirm backend URL is HTTPS.
- Confirm CORS is enabled.

Slow first request:

- Free Render services can cold start.
- Optional ping every 5 minutes:
  - https://news-robo-api.onrender.com/health

Translation notes:

- LibreTranslate is integrated in the frontend news feed.
- News title/content are translated from English and cached in localStorage.
- Supported target examples: en, es, fr, hi, te, de, ar.

## Final architecture

Frontend (Vercel)
-> https://your-app.vercel.app
-> Backend API (Render)
-> https://news-robo-api.onrender.com
-> PostgreSQL

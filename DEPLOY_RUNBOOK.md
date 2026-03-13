# Deploy Runbook (Render API + Vercel Frontend)

This is the single source of truth for deploying and validating NEWS ROBO.

## 1) Backend API (Render)

Service URL:

https://news-robo-api.onrender.com

Required environment variables (Render -> Settings -> Environment):

PORT=10000
DATABASE_URL=<your_render_postgres_connection_string>

Backend route checks:

- https://news-robo-api.onrender.com/
- https://news-robo-api.onrender.com/health
- https://news-robo-api.onrender.com/news
- https://news-robo-api.onrender.com/api/news

Expected:

- Root returns API running message
- /health returns ok true
- /news returns JSON with data and pagination
- /api/news returns same data (compat route)

## 2) Frontend API config

Use Vite env variable:

VITE_API_URL=https://news-robo-api.onrender.com

Compatibility variable also supported:

VITE_API_BASE_URL=https://news-robo-api.onrender.com

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

## Final architecture

Frontend (Vercel)
-> https://your-app.vercel.app
-> Backend API (Render)
-> https://news-robo-api.onrender.com
-> PostgreSQL

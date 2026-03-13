# Hosting Environment Variables (Quick Copy)

Use these values in your frontend hosting dashboard (Netlify, Vercel, or Render Static Site).

## Frontend

VITE_API_BASE_URL=https://news-robo-api.onrender.com

## Backend (Render Web Service)

PORT=10000
DATABASE_URL=<your_render_postgres_connection_string>

## Notes

- After adding or changing env vars, redeploy the service.
- Frontend should only expose VITE_ variables.
- Keep secret keys only in backend environment settings.

## Verify Deployment

Run this command from the project root:

npm run verify:deploy

Optional frontend check:

FRONTEND_URL=<your_frontend_url> npm run verify:deploy

## Optional Cold-Start Mitigation

For free-tier backend services, configure an external ping every 5 minutes:

https://news-robo-api.onrender.com/health

Tools:
- UptimeRobot
- Cron-job.org

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--api-base-url") {
      args.apiBaseUrl = argv[i + 1] || "";
      i += 1;
      continue;
    }

    if (token === "--frontend-url") {
      args.frontendUrl = argv[i + 1] || "";
      i += 1;
      continue;
    }
  }
  return args;
}

const cliArgs = parseArgs(process.argv.slice(2));
const apiBaseUrl = cliArgs.apiBaseUrl || process.env.API_BASE_URL || "https://news-robo-api.onrender.com";
const frontendUrl = cliArgs.frontendUrl || process.env.FRONTEND_URL || "";

async function requestJson(url) {
  const response = await fetch(url);
  const text = await response.text();

  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  return {
    ok: response.ok,
    status: response.status,
    body,
  };
}

async function requestHeadOrGet(url) {
  try {
    const head = await fetch(url, { method: "HEAD" });
    if (head.ok || head.status === 405) {
      return { ok: true, status: head.status, method: "HEAD" };
    }
  } catch {
    // Fallback to GET for hosts that do not support HEAD.
  }

  const get = await fetch(url, { method: "GET" });
  return { ok: get.ok, status: get.status, method: "GET" };
}

function fail(message) {
  console.error(`VERIFY RESULT: FAIL - ${message}`);
  process.exit(1);
}

(async () => {
  console.log(`VERIFY API BASE: ${apiBaseUrl}`);

  const health = await requestJson(`${apiBaseUrl}/health`);
  if (!health.ok || health.body?.ok !== true) {
    fail(`/health check failed (status ${health.status})`);
  }
  console.log(`OK /health (${health.status})`);

  const news = await requestJson(`${apiBaseUrl}/news?limit=1&page=1`);
  if (!news.ok) {
    fail(`/news check failed (status ${news.status})`);
  }
  if (!news.body || !Array.isArray(news.body.data)) {
    fail(`/news response missing data[]`);
  }
  console.log(`OK /news (${news.status}) count=${news.body.pagination?.total ?? "n/a"}`);

  if (frontendUrl) {
    const frontend = await requestHeadOrGet(frontendUrl);
    if (!frontend.ok) {
      fail(`frontend check failed for ${frontendUrl} (status ${frontend.status})`);
    }
    console.log(`OK frontend ${frontendUrl} (${frontend.status} via ${frontend.method})`);
  } else {
    console.log("SKIP frontend check (FRONTEND_URL not set)");
  }

  console.log("VERIFY RESULT: PASS");
})().catch((error) => {
  fail(error.message || "unknown error");
});

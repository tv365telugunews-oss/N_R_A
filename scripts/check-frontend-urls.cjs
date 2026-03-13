const defaultCandidates = [
  "https://newsrobo3.netlify.app",
  "https://news-robo.netlify.app",
  "https://news-robo.web.app",
  "https://news-robo.firebaseapp.com",
];

function parseCandidates() {
  const raw = process.env.FRONTEND_URLS || "";
  if (!raw.trim()) {
    return defaultCandidates;
  }

  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: "GET" });
    return { ok: res.ok, status: res.status };
  } catch (error) {
    return { ok: false, status: 0, error: error.message };
  }
}

(async () => {
  const candidates = parseCandidates();

  console.log(`Checking ${candidates.length} frontend URL(s)...`);

  let found = false;
  for (const url of candidates) {
    const result = await checkUrl(url);
    if (result.ok) {
      console.log(`LIVE ${url} status=${result.status}`);
      found = true;
      continue;
    }

    if (result.error) {
      console.log(`DOWN ${url} error=${result.error}`);
    } else {
      console.log(`DOWN ${url} status=${result.status}`);
    }
  }

  if (!found) {
    console.log("No live frontend URL found in provided candidates.");
    process.exit(1);
  }

  process.exit(0);
})();

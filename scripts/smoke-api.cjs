const baseUrl = process.env.API_BASE_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const res = await fetch(url, options);
  const text = await res.text();

  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  return {
    url,
    status: res.status,
    ok: res.ok,
    body,
    source: res.headers.get("x-data-source") || "unknown",
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

(async () => {
  const idSuffix = Date.now();
  const createPayload = {
    category: "General",
    title: `Smoke Test ${idSuffix}`,
    description: "API smoke test insert",
    content: "This item is created by scripts/smoke-api.cjs",
    language: "en",
    location: "local",
    time: "now",
  };

  console.log(`SMOKE base URL: ${baseUrl}`);

  const health = await request("/health");
  console.log("HEALTH", health.status, JSON.stringify(health.body));

  const listBefore = await request("/news?limit=5&page=1");
  assert(listBefore.ok, `GET /news failed (${listBefore.status})`);
  assert(listBefore.body && Array.isArray(listBefore.body.data), "GET /news response missing data[]");
  console.log("LIST", listBefore.status, `source=${listBefore.source}`, `count=${listBefore.body.pagination?.total ?? "n/a"}`);

  const created = await request("/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(createPayload),
  });
  assert(created.ok, `POST /news failed (${created.status})`);
  assert(created.body && created.body.id, "POST /news response missing id");
  console.log("CREATE", created.status, `id=${created.body.id}`, `source=${created.source}`);

  const updatePayload = {
    ...createPayload,
    title: `${createPayload.title} Updated`,
    category: "Updated",
  };

  const updated = await request(`/news/${created.body.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatePayload),
  });
  assert(updated.ok, `PUT /news/:id failed (${updated.status})`);
  console.log("UPDATE", updated.status, `id=${updated.body.id}`, `source=${updated.source}`);

  const deleted = await request(`/news/${created.body.id}`, {
    method: "DELETE",
  });
  assert(deleted.ok, `DELETE /news/:id failed (${deleted.status})`);
  console.log("DELETE", deleted.status, `id=${deleted.body.id}`, `source=${deleted.source}`);

  console.log("SMOKE RESULT: PASS");
})().catch((error) => {
  console.error("SMOKE RESULT: FAIL");
  console.error(error.message);
  process.exit(1);
});

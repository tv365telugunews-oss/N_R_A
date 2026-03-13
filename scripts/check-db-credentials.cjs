require("dotenv").config();

const { Client } = require("pg");

function parseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  return new URL(url);
}

async function tryConnect(base, user) {
  const client = new Client({
    host: base.hostname,
    port: Number(base.port || 5432),
    database: base.pathname.replace(/^\//, ""),
    user,
    password: decodeURIComponent(base.password),
    ssl: { require: true, rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    const result = await client.query("SELECT current_user, current_database()");
    return { ok: true, row: result.rows[0] };
  } catch (error) {
    return { ok: false, code: error.code, message: error.message };
  } finally {
    try {
      await client.end();
    } catch {
      // ignore
    }
  }
}

(async () => {
  const parsed = parseUrl();
  const dbName = parsed.pathname.replace(/^\//, "");

  const candidates = [
    decodeURIComponent(parsed.username),
    dbName,
    `${dbName}_user`,
    `${dbName}user`,
    "postgres",
  ];

  const uniqueCandidates = [...new Set(candidates.filter(Boolean))];

  console.log(`Testing ${uniqueCandidates.length} candidate users against ${parsed.hostname}...`);

  for (const user of uniqueCandidates) {
    const result = await tryConnect(parsed, user);
    if (result.ok) {
      console.log(`SUCCESS user=${user}`);
      console.log(JSON.stringify(result.row));
      process.exit(0);
    }
    console.log(`FAIL user=${user} code=${result.code || "UNKNOWN"}`);
  }

  process.exit(1);
})();

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

async function run() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS news (
      id SERIAL PRIMARY KEY,
      category TEXT,
      title TEXT,
      description TEXT,
      content TEXT,
      language TEXT,
      location TEXT,
      time TEXT
    )
  `);

  await pool.query(
    `INSERT INTO news (category,title,description,content,language,location,time)
     VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [
      "General",
      "NEWS ROBO Launch",
      "System connected to PostgreSQL",
      "Database working successfully",
      "en",
      "global",
      "now",
    ]
  );

  const rows = await pool.query(
    "SELECT id, category, title, description FROM news ORDER BY id DESC LIMIT 5"
  );

  console.log("DB setup complete. Latest rows:");
  console.log(JSON.stringify(rows.rows, null, 2));
}

run()
  .catch((error) => {
    console.error("DB setup failed:", error.code, error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });

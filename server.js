import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection using Render DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Root test route
app.get("/", (req, res) => {
  res.send("NEWS ROBO API RUNNING");
});

// Get all news
app.get("/news", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM news ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database error");
  }
});

// Get single news article
app.get("/news/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      "SELECT * FROM news WHERE id=$1",
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database error");
  }
});

// Add news (Admin use)
app.post("/news", async (req, res) => {
  try {
    const {
      category,
      title,
      description,
      content,
      language,
      location,
      time
    } = req.body;

    const result = await pool.query(
      `INSERT INTO news 
      (category,title,description,content,language,location,time)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [category, title, description, content, language, location, time]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database insert error");
  }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`NEWS ROBO API running on port ${PORT}`);
});
import pool from "./db.js";

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Connected to Neon! Time:", result.rows[0]);
  } catch (err) {
    console.error(" Database connection error:", err);
  }
}

testConnection();

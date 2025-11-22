import { pool } from "../db.js";
export const LinkModel = {
  async getByShortUrl(short_url) {
    const result = await pool.query(
      "SELECT * FROM short_urls WHERE short_url = $1",
      [short_url]
    );
    return result.rows[0] || null;
  },
  
  async exists(short_url) {
    const result = await pool.query(
      "SELECT 1 FROM short_urls WHERE short_url = $1 LIMIT 1",
      [short_url]
    );
    return result.rows.length > 0;
  },

  async create(original_url, short_url, label) {
    const result = await pool.query(
      `INSERT INTO short_urls (original_url, short_url, label, clicks, created_at, updated_at)
       VALUES ($1, $2, $3, 0, NOW(), NOW())
       RETURNING *`,
      [original_url, short_url, label]
    );
    return result.rows[0];
  },

  async findByShortUrl(short_url) {
    const result = await pool.query(
      `SELECT * FROM short_urls WHERE LOWER(TRIM(short_url)) = LOWER(TRIM($1))`,
      [short_url]
    );
    return result.rows[0];
  },

  async incrementClicks(short_url) {
    const result = await pool.query(
      `UPDATE short_urls 
       SET clicks = clicks + 1, last_clicked = NOW(), updated_at = NOW()
       WHERE LOWER(TRIM(short_url)) = LOWER(TRIM($1))
       RETURNING *`,
      [short_url]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query(
      `SELECT * FROM short_urls ORDER BY created_at DESC`
    );
    return result.rows;
  },

  async delete(short_url) {
    const result = await pool.query(
      `DELETE FROM short_urls 
       WHERE LOWER(TRIM(short_url)) = LOWER(TRIM($1))
       RETURNING *`,
      [short_url]
    );
    return result.rows[0];
  },
};

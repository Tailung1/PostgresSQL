import pool from "../config/db.config.js";

export default async function getProducts(req, res) {
  try {
    const result = await pool.query("SELECT * FROM untitled_table");  
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);  
    res.status(500).json({ error: "Internal server error" });
  }
}


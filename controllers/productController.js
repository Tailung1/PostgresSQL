import pool from "pool";

async function getProducts(req, res) {
  try {
    const result = await pool.query("SELECT * FROM Ecommerse");
  } catch (ererrror) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}

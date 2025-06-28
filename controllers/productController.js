import pool from "../config/db.config.js";

async function getProducts(req, res) {
  try {
    const result = await pool.query("SELECT * FROM untitled_table");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function createProduct(req, res) {
  const { name, category, price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO untitled_table (name,category,price) VALUES ( $1, $2, $3) RETURNING *",
      [name, category, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { getProducts, createProduct };

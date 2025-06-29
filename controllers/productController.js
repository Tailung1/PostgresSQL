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
async function getOneProduct(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM untitled_table WHERE id=$1",
      [id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(404).json({ error: "Internal server error" });
  }
}

async function createProduct(req, res) {
  const { name, category, price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO untitled_table (name,category,price) VALUES ($1, $2, $3) RETURNING *",
      [name, category, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;

  const { category, name, price } = req.body;

  try {
    const result = await pool.query(
      "UPDATE untitled_table SET category= $1, name= $2, price=$3 WHERE id = $4 RETURNING *",
      [category, name, price, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating product", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteProdct(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM untitled_table WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted", product: result.rows[0] });
  } catch (err) {
    console.error("Error deleting product", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCategoryStats(req, res) {
  try {
    const result = await pool.query(
      "SELECT category, COUNT(*), MAX(price), AVG(price) as average_Price FROM untitled_table GROUP BY category"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error deleting product", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}

export {
  getProducts,
  createProduct,
  updateProduct,
  deleteProdct,
  getOneProduct,
  getCategoryStats,
};

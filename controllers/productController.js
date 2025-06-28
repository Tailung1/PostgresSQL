// import pool from "pool";

export default async function getProducts(req, res) {
  return res.json({
    message: "Welcome to the Express PostgresSQL API",
  });
  //   try {
  //     const result = await pool.query("SELECT * FROM Ecommerse");
  //   } catch (ererrror) {
  //     console.error("Error executing query", error.stack);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
}

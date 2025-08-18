// import pool from "../config/db.config.js";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
const prisma = new PrismaClient();
import xlsx from "xlsx";

async function getProducts(req, res) {
  try {
    // const result = await pool.query("SELECT * FROM products");
    const result = await prisma.products.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getOneProduct(req, res) {
  const { id } = req.params;
  try {
    // const result = await pool.query(
    //   "SELECT * FROM products WHERE id=$1",
    //   [id]
    // );
    // if (result.rowCount === 0) res.status(404).json({ message: "Products not found" });
    const product = await prisma.products.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product)
      res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ error: "Internal server error" });
  }
}

async function createProduct(req, res) {
  const { name, category, price } = req.body;
  try {
    // const result = await pool.query(
    //   "INSERT INTO products (name,category,price) VALUES ($1, $2, $3) RETURNING *",
    //   [name, category, price]
    // );
    const newProduct = await prisma.products.create({
      data: { name, category, price },
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;

  const { category, name, price } = req.body;

  try {
    // const result = await pool.query(
    //   "UPDATE products SET category= $1, name= $2, price=$3 WHERE id = $4 RETURNING *",
    //   [category, name, price, id]
    // );
    // if (result.rows.length === 0) {
    //   return res.status(404).json({ error: "products not found" });
    // }
    const updatedProduct = await prisma.products.update({
      where: { id: parseInt(id) },
      data: { category, name, price },
    });
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteProdct(req, res) {
  const { id } = req.params;

  try {
    // const result = await pool.query(
    //   "DELETE FROM products WHERE id = $1 RETURNING *",
    //   [id]
    // );
    // if (result.rows.length === 0) {
    //   return res.status(404).json({ error: "Product not found" });
    // }

    const deletedProduct = await prisma.products.delete({
      where: { id: parseInt(id) },
    });

    if (!deleteProdct) {
      res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted", product: deletedProduct });
  } catch (err) {
    console.error("Error deleting product", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCategoryStats(req, res) {
  try {
    // const result = await pool.query(
    //   "SELECT category, COUNT(*), MAX(price), AVG(price) as average_Price FROM products GROUP BY category"
    // );
    const result = await prisma.products.groupBy({
      by: ["category"],
      _count: true,
      _min: { price: true },
      _avg: { price: true },
      _max: { price: true },
    });
    const formatedResult = result.map((item) => ({
      category: item.category,
      count: item._count,
      minPrice: item._min.price,
      avgPrice: item._avg.price,
      maxPrice: item._max.price,
    }));
    res.json(formatedResult);
  } catch (err) {
    console.error("Error deleting product", err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function buyProduct(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }
    const product = await prisma.products.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      return res.status(404).send("Product not found");
    } else if (product.stock < 1) {
      return res.status(404).send("Stock is 0");
    }
    await prisma.products.update({
      where: { id: parseInt(id) },
      data: { stock: product.stock - 1 },
    });

    await prisma.userProducts.create({
      data: { userId: parseInt(userId), productId: parseInt(id) },
    });
    res.status(201).send("Product bought successfully");
  } catch (err) {
    res.status(404).send(err.message);
  }
}

async function uploadProductsExcel(req, res) {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = xlsx.utils.sheet_add_json(workbook.Sheets[sheetName]);

  await prisma.products.createMany({
    data: sheet.map((product) => ({
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      stock: product.stock,
    })),
  });
  fs.unlinkSync(req.file.path);
  return res
    .status(200)
    .send({ message: "Products added to databse successfully" });
}

async function uploadProductImages(req, res) {
  const { id } = req.params;

  const product = await prisma.products.findUnique({
    where: { id: parseInt(id) },
  });
  if (!product) {
    if (req.files.length > 0) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    return res.status(400).send({ message: "Product not found" });
  }
  if (!req.file || req.file.length === 0) {
    return res.status(400).send({ message: "No files  upladed " });
  }
}

export {
  getProducts,
  createProduct,
  updateProduct,
  deleteProdct,
  getOneProduct,
  getCategoryStats,
  buyProduct,
  uploadProductsExcel,
  uploadProductImages,
};

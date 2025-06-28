import productRouter from "./routes/productRouters";
require("dotenv").config();
const express = require("express");
const userRouters = require("./src/routes/userRoutes");
const app = express();
const port = process.env.port || 3000;

//Middleware
app.use(express.json());

//Routes

app.get("/", (req, res) => {
  res.json("Welcome to the Express PostgreSQL API");
});

app.use("/api/products", productRouter);

app.use((err, req, next) => {
  console.log(err.stack);
  req.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

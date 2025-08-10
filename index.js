import productRouter from "./routes/productRouters.js";
import userRouter from "./routes/userRouters.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to the Express PostgreSQL API");
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use("/uploads",express.static("./uploads"))

app.use((req, res, next) => {
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

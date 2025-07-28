import express from "express";
const productRouter = express.Router();

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProdct,
  getOneProduct,
  getCategoryStats,
  buyProduct,
} from "../controllers/productController.js";
import { auth } from "../middleware/auth.js";

productRouter.route("/").get(getProducts).post(createProduct);
productRouter.get("/getCategoryStats", getCategoryStats);
productRouter
  .route("/:id")
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteProdct);
productRouter.post("/buyProduct/:id", auth, buyProduct);

export default productRouter;

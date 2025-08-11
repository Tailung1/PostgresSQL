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
  uploadProductsExcel,
} from "../controllers/productController.js";
import { auth, isAdmin } from "../middleware/auth.js";

productRouter.route("/").get(getProducts).post(createProduct);
productRouter.get("/getCategoryStats", getCategoryStats);
productRouter
  .route("/:id")
  .get(getOneProduct)
  .put(auth, isAdmin, updateProduct)
  .delete(auth, isAdmin, deleteProdct);

productRouter.post("/buyProduct/:id", auth, buyProduct);
productRouter.post("./uploadProducts", uploadProductsExcel);

export default productRouter;

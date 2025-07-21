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

productRouter.route("/").get(getProducts).post(createProduct);
productRouter.get("/getCategoryStats", getCategoryStats);
productRouter
  .route("/:id")
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteProdct);
  productRouter.post("/buyProduct:id", buyProduct);

export default productRouter;

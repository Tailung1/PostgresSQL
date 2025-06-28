import express from "express";
const productRouter = express.Router();
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProdct,
} from "../controllers/productController.js";

productRouter.route("/").get(getProducts).post(createProduct);
productRouter.route("/:id").put(updateProduct).delete(deleteProdct);
export default productRouter;

import express from "express";
const productRouter = express.Router();
import {
  getProducts,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";

productRouter.route("/").get(getProducts).post(createProduct);
productRouter.route("/:id").put(updateProduct);
export default productRouter;

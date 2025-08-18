import express from "express";
const productRouter = express.Router();
import {
  uploadProducts,
  uploadProductImagesExcel,
} from "../middleware/uploadFile.js";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProdct,
  getOneProduct,
  getCategoryStats,
  buyProduct,
  uploadProductsExcel,
  uploadProductImages,
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

productRouter.post(
  "/uploadProducts",
  uploadProducts.single("uploadProducts"),
  uploadProductsExcel
);
productRouter.post(
  "/uploadProductImages/:id",
  uploadProductImagesExcel.array("UploadImages", 5),
  uploadProductImages
);

export default productRouter;

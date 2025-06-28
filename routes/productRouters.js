import express from "express"
const productRouter=express.Router()
import getProducts from "../controllers/productController.js"

productRouter.get("/", getProducts);

export default productRouter;
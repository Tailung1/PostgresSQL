import express from "express"
const productRouter=express.Router()
import {getProducts,createProduct} from "../controllers/productController.js"

productRouter.route("/").get(getProducts).post(createProduct);

export default productRouter;
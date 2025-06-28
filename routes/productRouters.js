import express from "express"
const express = express()
const productRouter=express.Router()
import getProducts from "../controllers/productController"

productRouter.get("/", getProducts);

export default productRouter;
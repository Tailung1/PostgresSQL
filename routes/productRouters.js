import express from "express"
const express = express()
const router=express.Router()
import getProducts from "../controllers/productController"

router.get("/",getProducts)

export default router
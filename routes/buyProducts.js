import express from "express";
import { buyProduct } from "../controllers/productController";
import { buyProduct } from "../controllers/productController";

const buyProductsRoter = express.Router();

buyProduct.route("/id").post(buyProduct);

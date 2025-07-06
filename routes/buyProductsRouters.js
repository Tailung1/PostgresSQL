import express from "express";
import { buyProduct } from "../controllers/productController";

const buyProductsRoter = express.Router();

buyProductsRoter.route("/id").post(buyProduct);

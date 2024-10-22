import express from "express";
import { handleGetFilteredProduct } from "../../controllers/shop/product.controller.js";
const router = express.Router();

// GET FILTERED PRODUCT ROUTE
router.get("/get", handleGetFilteredProduct);

export default router;

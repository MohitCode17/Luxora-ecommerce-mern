import express from "express";
import {
  fetchAllProducts,
  fetchProduct,
  handleAddProduct,
  handleDeleteProduct,
  handleEditProduct,
  handleImageUpload,
} from "../../controllers/admin/product.controller.js";

const router = express.Router();

// PRODUCT IMAGE UPLOAD ROUTE
router.post("/upload-image", handleImageUpload);

// ADD NEW PRODUCT ROUTE
router.post("/add", handleAddProduct);

// FETCHING ALL PRODUCT ROUTE
router.post("/get", fetchAllProducts);

// FETCHING SINGLE PRODUCT ROUTE
router.post("/get/:id", fetchProduct);

// UPDATE PRODUCT ROUTE
router.post("/edit/:id", handleEditProduct);

// DELETE PRODUCT ROUTE
router.post("/delete/:id", handleDeleteProduct);

export default router;

import express from "express";
import {
  fetchAllProducts,
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
router.get("/get", fetchAllProducts);

// UPDATE PRODUCT ROUTE
router.put("/edit/:id", handleEditProduct);

// DELETE PRODUCT ROUTE
router.delete("/delete/:id", handleDeleteProduct);

export default router;

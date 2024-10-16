import ErrorHandler from "../../middlewares/error.js";
import { catchAsyncErrors } from "../../middlewares/catchAsyncError.js";
import { cloudinaryUpload } from "../../helper/cloudinary-upload.js";
import Product from "../../models/product.model.js";

export const handleImageUpload = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("Product image are required", 400));

  const file = req.files.productImage;
  const folderName = "Luxora Product Images";

  const uploadResult = await cloudinaryUpload(file, folderName);

  res.status(200).json({
    success: true,
    uploadResult,
  });
});

export const handleAddProduct = catchAsyncErrors(async (req, res, next) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  } = req.body;

  console.log(averageReview, "averageReview");

  const newProduct = await Product.create({
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  });

  res.status(201).json({
    success: true,
    newProduct,
  });
});

export const handleEditProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  } = req.body;

  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("No product found.", 404));

  product.title = title || product.title;
  product.description = description || product.description;
  product.category = category || product.category;
  product.brand = brand || product.brand;
  product.price = price === "" ? 0 : price || product.price;
  product.salePrice = salePrice === "" ? 0 : salePrice || product.salePrice;
  product.totalStock = totalStock || product.totalStock;
  product.averageReview = averageReview || product.averageReview;
  product.image = image || product.image;

  await product.save();

  res.status(200).json({
    success: true,
    product,
  });
});

export const handleDeleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) return next(new ErrorHandler("No product found", 404));

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

export const fetchAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({});

  res.status(200).json({
    success: true,
    products,
  });
});

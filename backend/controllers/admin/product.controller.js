import ErrorHandler from "../../middlewares/error.js";
import { catchAsyncErrors } from "../../middlewares/catchAsyncError.js";
import { cloudinaryUpload } from "../../helper/cloudinary-upload.js";

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

export const handleAddProduct = catchAsyncErrors(async (req, res, next) => {});

export const handleEditProduct = catchAsyncErrors(async (req, res, next) => {});

export const handleDeleteProduct = catchAsyncErrors(
  async (req, res, next) => {}
);

export const fetchAllProducts = catchAsyncErrors(async (req, res, next) => {});

export const fetchProduct = catchAsyncErrors(async (req, res, next) => {});

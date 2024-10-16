import ErrorHandler from "../../middlewares/error.js";
import { catchAsyncErrors } from "../../middlewares/catchAsyncError.js";

export const handleImageUpload = catchAsyncErrors(async (req, res, next) => {});

export const handleAddProduct = catchAsyncErrors(async (req, res, next) => {});

export const handleEditProduct = catchAsyncErrors(async (req, res, next) => {});

export const handleDeleteProduct = catchAsyncErrors(
  async (req, res, next) => {}
);

export const fetchAllProducts = catchAsyncErrors(async (req, res, next) => {});

export const fetchProduct = catchAsyncErrors(async (req, res, next) => {});

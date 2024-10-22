import ErrorHandler from "../../middlewares/error.js";
import { catchAsyncErrors } from "../../middlewares/catchAsyncError.js";
import Product from "../../models/product.model.js";

export const handleGetFilteredProduct = catchAsyncErrors(
  async (req, res, next) => {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      products,
    });
  }
);

import { catchAsyncErrors } from "../../middlewares/catchAsyncError.js";
import ErrorHandler from "../../middlewares/error.js";
import User from "../../models/user.model.js";

// REGISTER USER CONTROLLER
export const handleRegister = catchAsyncErrors(async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password)
    return next(new ErrorHandler("All fields are required.", 400));

  // CHECK IF USER ALREADY REGISTER
  let user = await User.findOne({ email });

  if (user)
    return next(
      new ErrorHandler("User already registered with same email.", 400)
    );

  // CREATE NEW USER
  user = await User.create({
    userName,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "Registration successful.",
  });
});

// LOGIN USER CONTROLLER
export const handleLogin = catchAsyncErrors(async (req, res, next) => {});

// LOGOUT USER CONTROLLER
export const handleLogout = catchAsyncErrors(async (req, res, next) => {});

// CHECK-AUTH USER CONTROLLER
export const handleCheckAuth = catchAsyncErrors(async (req, res, next) => {});

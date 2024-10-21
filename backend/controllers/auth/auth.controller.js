import { catchAsyncErrors } from "../../middlewares/catchAsyncError.js";
import ErrorHandler from "../../middlewares/error.js";
import User from "../../models/user.model.js";
import { config } from "../../config/env.config.js";
import jwt from "jsonwebtoken";

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
export const handleLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("All fields are required.", 400));

  // CHECK USER EXIST
  const user = await User.findOne({ email });

  if (!user)
    return next(new ErrorHandler("Invalid Credentials, Try again!", 400));

  // CHECK PASSWORD
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch)
    return next(new ErrorHandler("Invalid Credentials, Try again!", 400));

  // GENERATE JWT TOKEN AND PASS TO COOKIE
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
      userName: user.userName,
    },
    config.JWT_SECRET_KEY,
    {
      expiresIn: "60m",
    }
  );

  res.cookie("token", token, { httpOnly: true, secure: false }).json({
    success: true,
    message: "Sign in successfully",
    user: {
      email: user.email,
      role: user.role,
      id: user._id,
      userName: user.userName,
    },
  });
});

// LOGOUT USER CONTROLLER
export const handleLogout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logout successfully.",
  });
});

// CHECK-AUTH USER CONTROLLER
export const handleCheckAuth = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

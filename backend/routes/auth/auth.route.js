import express from "express";
import {
  handleCheckAuth,
  handleLogin,
  handleLogout,
  handleRegister,
} from "../../controllers/auth/auth.controller.js";
import { checkAuthenticated } from "../../middlewares/authenticated.js";

const router = express.Router();

// REGISTER USER ROUTE
router.post("/register", handleRegister);

// LOGIN USER ROUTE
router.post("/login", handleLogin);

// LOGOUT USER ROUTE
router.post("/logout", handleLogout);

// CHECK-AUTH ROUTE
router.get("/check-auth", checkAuthenticated, handleCheckAuth);

export default router;

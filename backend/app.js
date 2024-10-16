import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import { config } from "./config/env.config.js";
import fileUpload from "express-fileupload";

import authRoutes from "./routes/auth/auth.route.js";
import productRoutes from "./routes/admin/product.route.js";

const app = express();

// CORS CONFIG
app.use(
  cors({
    origin: config.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// DEFAULT MIDDLEWARE
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// TESTING ROUTE
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server running..." });
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ERROR HANDLING MIDDLEWARE
app.use(errorMiddleware);

export default app;

import express from "express";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();

// CORS CONFIG

// DEFAULT MIDDLEWARE

// TESTING ROUTE
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server running..." });
});

// ROUTES

// ERROR HANDLING MIDDLEWARE
app.use(errorMiddleware);

export default app;

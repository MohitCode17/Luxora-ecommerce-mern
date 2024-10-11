import express from "express";

const app = express();

// CORS CONFIG

// DEFAULT MIDDLEWARE

// TESTING ROUTE
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server running..." });
});

// ROUTES

// ERROR HANDLING MIDDLEWARE

export default app;

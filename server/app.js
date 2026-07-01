const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const path = require("path");

const apiRoutes = require("./src/routes");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const ApiError = require("./src/utils/ApiError");

const app = express();

// 1. Global Pre-Routing Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));
app.use(morgan("dev"));
app.use(compression());

// Body Parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Static uploads folder configuration (for future avatar/product image uploads)
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// 2. Versioned API Routes Mount
app.use("/api/v1", apiRoutes);

// 3. 404 Error Handler Interceptor
app.use((req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

// 4. Global Error handling middleware (always placed at the end)
app.use(errorMiddleware);

module.exports = app;

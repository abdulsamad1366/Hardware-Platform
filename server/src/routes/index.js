const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const manufacturerRoutes = require("./manufacturerRoutes");
const productRoutes = require("./productRoutes");

// Mounting versioned auth, manufacturer, and product sub-routers
router.use("/auth", authRoutes);
router.use("/manufacturers", manufacturerRoutes);
router.use("/products", productRoutes);

// Base health check status endpoint
router.get("/healthcheck", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SecureLink B2B Procurement API Server is active",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;

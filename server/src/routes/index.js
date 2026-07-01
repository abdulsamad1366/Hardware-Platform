const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const manufacturerRoutes = require("./manufacturerRoutes");
const productRoutes = require("./productRoutes");
const productVariantRoutes = require("./productVariantRoutes");

// Mounting versioned auth, manufacturer, product, and variant sub-routers
router.use("/auth", authRoutes);
router.use("/manufacturers", manufacturerRoutes);
router.use("/products", productRoutes);
router.use("/variants", productVariantRoutes);

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

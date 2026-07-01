const express = require("express");
const router = express.Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  getProductById,
  listProducts,
} = require("../controllers/productController");

const {
  createProductValidator,
  updateProductValidator,
} = require("../validators/productValidator");

const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");
const uploadProductFiles = require("../middleware/uploadProductMiddleware");

// Configure upload middleware for multiple product images and document files
const productUpload = uploadProductFiles.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 10 },
  { name: "brochure", maxCount: 1 },
  { name: "datasheet", maxCount: 1 },
  { name: "installationGuide", maxCount: 1 },
  { name: "cadDrawing", maxCount: 1 },
]);

// --- PUBLIC ROUTES ---
router.get("/", listProducts);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProductById);

// --- ADMIN SECURED ROUTES ---
router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  productUpload,
  createProductValidator,
  createProduct
);

router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  productUpload,
  updateProductValidator,
  updateProduct
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  deleteProduct
);

module.exports = router;

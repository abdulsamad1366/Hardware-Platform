const express = require("express");
const router = express.Router();

const {
  createVariant,
  updateVariant,
  deleteVariant,
  listVariants,
} = require("../controllers/productVariantController");

const {
  createVariantValidator,
  updateVariantValidator,
} = require("../validators/productVariantValidator");

const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");
const uploadProductFiles = require("../middleware/uploadProductMiddleware");

// Configure upload fields mapping for variant images
const variantUpload = uploadProductFiles.fields([
  { name: "images", maxCount: 10 },
]);

// --- PUBLIC ROUTES ---
router.get("/", listVariants);

// --- ADMIN SECURED ROUTES ---
router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  variantUpload,
  createVariantValidator,
  createVariant
);

router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  variantUpload,
  updateVariantValidator,
  updateVariant
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  deleteVariant
);

module.exports = router;

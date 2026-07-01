const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));
    return next(new ApiError(400, "Validation Failed", extractedErrors));
  }
  next();
};

const createVariantValidator = [
  body("product")
    .notEmpty()
    .withMessage("Parent product ID reference is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid parent product ObjectId reference");
      }
      return true;
    }),
  body("sku")
    .trim()
    .notEmpty()
    .withMessage("Variant SKU is required"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Variant name is required"),
  body("price")
    .notEmpty()
    .withMessage("Variant price is required")
    .isFloat({ min: 0 })
    .withMessage("Variant price cannot be negative"),
  body("moq")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Variant MOQ must be a positive integer greater than or equal to 1"),
  body("availability")
    .optional()
    .isIn(["In Stock", "Out of Stock", "Made to Order"])
    .withMessage("Availability must be one of: In Stock, Out of Stock, Made to Order"),
  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be one of: Active, Inactive"),
  validateRequest,
];

const updateVariantValidator = [
  body("sku")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Variant SKU cannot be empty"),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Variant name cannot be empty"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Variant price cannot be negative"),
  body("moq")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Variant MOQ must be a positive integer greater than or equal to 1"),
  body("availability")
    .optional()
    .isIn(["In Stock", "Out of Stock", "Made to Order"])
    .withMessage("Availability must be one of: In Stock, Out of Stock, Made to Order"),
  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be one of: Active, Inactive"),
  validateRequest,
];

module.exports = {
  createVariantValidator,
  updateVariantValidator,
};

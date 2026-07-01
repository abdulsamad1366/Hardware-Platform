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

const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),
  body("sku")
    .trim()
    .notEmpty()
    .withMessage("Product SKU is required"),
  body("manufacturer")
    .notEmpty()
    .withMessage("Product manufacturer ID is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid manufacturer ObjectId reference");
      }
      return true;
    }),
  body("category")
    .notEmpty()
    .withMessage("Product category ID is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid category ObjectId reference");
      }
      return true;
    }),
  body("collectionRef")
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid collectionRef ObjectId reference");
      }
      return true;
    }),
  body("price")
    .notEmpty()
    .withMessage("Indicative price is required")
    .isFloat({ min: 0 })
    .withMessage("Price cannot be negative"),
  body("moq")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Minimum Order Quantity (MOQ) must be a positive integer greater than or equal to 1"),
  body("availability")
    .optional()
    .isIn(["In Stock", "Out of Stock", "Made to Order"])
    .withMessage("Availability must be one of: In Stock, Out of Stock, Made to Order"),
  body("status")
    .optional()
    .isIn(["Draft", "Published", "Archived"])
    .withMessage("Status must be one of: Draft, Published, Archived"),
  validateRequest,
];

const updateProductValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty"),
  body("sku")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product SKU cannot be empty"),
  body("manufacturer")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid manufacturer ObjectId reference");
      }
      return true;
    }),
  body("category")
    .optional()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid category ObjectId reference");
      }
      return true;
    }),
  body("collectionRef")
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid collectionRef ObjectId reference");
      }
      return true;
    }),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price cannot be negative"),
  body("moq")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Minimum Order Quantity (MOQ) must be a positive integer greater than or equal to 1"),
  body("availability")
    .optional()
    .isIn(["In Stock", "Out of Stock", "Made to Order"])
    .withMessage("Availability must be one of: In Stock, Out of Stock, Made to Order"),
  body("status")
    .optional()
    .isIn(["Draft", "Published", "Archived"])
    .withMessage("Status must be one of: Draft, Published, Archived"),
  validateRequest,
];

module.exports = {
  createProductValidator,
  updateProductValidator,
};

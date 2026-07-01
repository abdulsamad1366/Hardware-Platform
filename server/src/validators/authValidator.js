const { body, validationResult } = require("express-validator");
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

const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Contact person name is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("phone")
    .trim()
    .isNumeric()
    .withMessage("Phone number must contain digits only")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be exactly 10 digits"),
  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("city")
    .optional()
    .trim(),
  body("state")
    .optional()
    .trim(),
  body("country")
    .optional()
    .trim(),
  body("gst")
    .optional()
    .trim()
    .custom((value) => {
      if (!value) return true;
      const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
      if (!gstRegex.test(value.toUpperCase())) {
        throw new Error("Invalid GSTIN format (e.g. 22AAAAA1111A1Z1)");
      }
      return true;
    }),
  validateRequest,
];

const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
  validateRequest,
];

const forgotPasswordValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  validateRequest,
];

const resetPasswordValidator = [
  body("token")
    .trim()
    .notEmpty()
    .withMessage("Reset token is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  validateRequest,
];

module.exports = {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
};

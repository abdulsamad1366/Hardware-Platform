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

const createManufacturerValidator = [
  body("companyName")
    .trim()
    .notEmpty()
    .withMessage("Manufacturer company name is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid business email address")
    .normalizeEmail(),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),
  body("website")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Please enter a valid website URL"),
  body("gst")
    .trim()
    .notEmpty()
    .withMessage("GST number is required")
    .custom((value) => {
      const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
      if (!gstRegex.test(value.toUpperCase())) {
        throw new Error("Invalid GSTIN format (e.g. 22AAAAA1111A1Z1)");
      }
      return true;
    }),
  body("pan")
    .optional({ checkFalsy: true })
    .trim()
    .custom((value) => {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(value.toUpperCase())) {
        throw new Error("Invalid PAN format (e.g. ABCDE1234F)");
      }
      return true;
    }),
  body("yearEstablished")
    .optional({ checkFalsy: true })
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage(`Year established must be an integer between 1800 and ${new Date().getFullYear()}`),
  body("companyType")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Company type cannot be empty"),
  body("country")
    .trim()
    .notEmpty()
    .withMessage("Country is required"),
  body("state")
    .trim()
    .notEmpty()
    .withMessage("State is required"),
  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),
  body("postalCode")
    .trim()
    .notEmpty()
    .withMessage("Postal code is required"),
  body("oemAvailable")
    .optional()
    .isBoolean()
    .withMessage("oemAvailable must be a boolean"),
  body("exportAvailable")
    .optional()
    .isBoolean()
    .withMessage("exportAvailable must be a boolean"),
  body("bulkSupply")
    .optional()
    .isBoolean()
    .withMessage("bulkSupply must be a boolean"),
  body("customManufacturing")
    .optional()
    .isBoolean()
    .withMessage("customManufacturing must be a boolean"),
  body("iso")
    .optional()
    .isBoolean()
    .withMessage("ISO certification parameter must be a boolean"),
  body("bis")
    .optional()
    .isBoolean()
    .withMessage("BIS certification parameter must be a boolean"),
  body("ce")
    .optional()
    .isBoolean()
    .withMessage("CE certification parameter must be a boolean"),
  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be one of: Active, Inactive"),
  body("verificationStatus")
    .optional()
    .isIn(["Pending", "Verified", "Rejected"])
    .withMessage("Verification status must be one of: Pending, Verified, Rejected"),
  validateRequest,
];

const updateManufacturerValidator = [
  body("companyName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Manufacturer company name cannot be empty"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid business email address")
    .normalizeEmail(),
  body("phone")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone number cannot be empty"),
  body("website")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Please enter a valid website URL"),
  body("gst")
    .optional()
    .trim()
    .custom((value) => {
      const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
      if (!gstRegex.test(value.toUpperCase())) {
        throw new Error("Invalid GSTIN format (e.g. 22AAAAA1111A1Z1)");
      }
      return true;
    }),
  body("pan")
    .optional({ checkFalsy: true })
    .trim()
    .custom((value) => {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(value.toUpperCase())) {
        throw new Error("Invalid PAN format (e.g. ABCDE1234F)");
      }
      return true;
    }),
  body("yearEstablished")
    .optional({ checkFalsy: true })
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage(`Year established must be an integer between 1800 and ${new Date().getFullYear()}`),
  body("companyType")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Company type cannot be empty"),
  body("country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Country cannot be empty"),
  body("state")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("State cannot be empty"),
  body("city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("City cannot be empty"),
  body("postalCode")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Postal code cannot be empty"),
  body("oemAvailable")
    .optional()
    .isBoolean()
    .withMessage("oemAvailable must be a boolean"),
  body("exportAvailable")
    .optional()
    .isBoolean()
    .withMessage("exportAvailable must be a boolean"),
  body("bulkSupply")
    .optional()
    .isBoolean()
    .withMessage("bulkSupply must be a boolean"),
  body("customManufacturing")
    .optional()
    .isBoolean()
    .withMessage("customManufacturing must be a boolean"),
  body("iso")
    .optional()
    .isBoolean()
    .withMessage("ISO certification parameter must be a boolean"),
  body("bis")
    .optional()
    .isBoolean()
    .withMessage("BIS certification parameter must be a boolean"),
  body("ce")
    .optional()
    .isBoolean()
    .withMessage("CE certification parameter must be a boolean"),
  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be one of: Active, Inactive"),
  body("verificationStatus")
    .optional()
    .isIn(["Pending", "Verified", "Rejected"])
    .withMessage("Verification status must be one of: Pending, Verified, Rejected"),
  validateRequest,
];

module.exports = {
  createManufacturerValidator,
  updateManufacturerValidator,
};

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ApiError = require("../utils/ApiError");

// Target uploads folder resolution
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 1. Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
  },
});

// 2. Custom Filter Gating Extensions per Field
const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname).toLowerCase();

  // Image fields
  if (
    file.fieldname === "logo" ||
    file.fieldname === "banner" ||
    file.fieldname === "factoryImages"
  ) {
    const allowedImgExts = [".jpg", ".jpeg", ".png", ".webp"];
    if (allowedImgExts.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          400,
          `Invalid file format for '${file.fieldname}'. Only JPG, JPEG, PNG, and WEBP images are allowed.`
        ),
        false
      );
    }
  }
  // Brochure document fields
  else if (file.fieldname === "companyBrochure") {
    const allowedDocExts = [".pdf"];
    if (allowedDocExts.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          400,
          `Invalid file format for '${file.fieldname}'. Only PDF brochures are allowed.`
        ),
        false
      );
    }
  }
  // Video fields
  else if (file.fieldname === "factoryVideo") {
    const allowedVidExts = [".mp4", ".webm"];
    if (allowedVidExts.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          400,
          `Invalid file format for '${file.fieldname}'. Only MP4 and WEBM video formats are allowed.`
        ),
        false
      );
    }
  } else {
    cb(new ApiError(400, `Unexpected file field: '${file.fieldname}' detected.`), false);
  }
};

// 3. Initialize Multer
const uploadManufacturerFiles = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB maximum limit (to support larger video file uploads)
  },
});

module.exports = uploadManufacturerFiles;

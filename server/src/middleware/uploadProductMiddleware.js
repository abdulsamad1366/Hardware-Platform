const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ApiError = require("../utils/ApiError");

// Target uploads directory resolution
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

// 2. Custom Filter Gating Extensions per Field type
const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname).toLowerCase();

  // Image fields
  if (file.fieldname === "coverImage" || file.fieldname === "galleryImages") {
    const allowedImgExts = [".jpg", ".jpeg", ".png", ".webp"];
    if (allowedImgExts.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          400,
          `Invalid file format for ${file.fieldname}. Only JPG, JPEG, PNG, and WEBP images are allowed.`
        ),
        false
      );
    }
  }
  // Document fields
  else if (
    file.fieldname === "brochure" ||
    file.fieldname === "datasheet" ||
    file.fieldname === "installationGuide" ||
    file.fieldname === "cadDrawing"
  ) {
    const allowedDocExts = [".pdf", ".zip", ".dxf", ".dwg"];
    if (allowedDocExts.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(
        new ApiError(
          400,
          `Invalid file format for ${file.fieldname}. Only PDF, ZIP, DXF, and DWG documents are allowed.`
        ),
        false
      );
    }
  } else {
    cb(new ApiError(400, `Unexpected file field field: '${file.fieldname}' detected.`), false);
  }
};

// 3. Initialize Multer Configuration
const uploadProductFiles = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB maximum limit (to support larger CAD/brochure downloads)
  },
});

module.exports = uploadProductFiles;

const mongoose = require("mongoose");

const manufacturerSchema = new mongoose.Schema(
  {
    // 1. Basic Information
    companyName: {
      type: String,
      required: [true, "Manufacturer company name is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Manufacturer slug is required"],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    logo: {
      type: String,
      default: "",
    },
    banner: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },

    // 2. Business Information
    gst: {
      type: String,
      required: [true, "GST number is required"],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, "Please enter a valid GSTIN format"],
    },
    pan: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },
    yearEstablished: {
      type: Number,
      min: [1800, "Year established cannot be before 1800"],
      max: [new Date().getFullYear(), "Year established cannot be in the future"],
    },
    companyType: {
      type: String,
      trim: true,
      default: "Partnership", // Proprietorship, Partnership, Private Limited, Public Limited
    },

    // 3. Contact
    phone: {
      type: String,
      required: [true, "Contact phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Contact email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    website: {
      type: String,
      trim: true,
      default: "",
    },

    // 4. Address
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      default: "India",
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
      trim: true,
    },

    // 5. Business Capabilities
    oemAvailable: {
      type: Boolean,
      default: false,
    },
    exportAvailable: {
      type: Boolean,
      default: false,
    },
    bulkSupply: {
      type: Boolean,
      default: true,
    },
    customManufacturing: {
      type: Boolean,
      default: false,
    },

    // 6. Certifications
    iso: {
      type: Boolean,
      default: false,
    },
    bis: {
      type: Boolean,
      default: false,
    },
    ce: {
      type: Boolean,
      default: false,
    },
    otherCertifications: {
      type: [String],
      default: [],
    },

    // 7. Media
    factoryImages: {
      type: [String],
      default: [],
    },
    companyBrochure: {
      type: String,
      default: "",
    },
    factoryVideo: {
      type: String,
      default: "",
    },

    // 8. SEO
    metaTitle: {
      type: String,
      trim: true,
      default: "",
    },
    metaDescription: {
      type: String,
      trim: true,
      default: "",
    },
    keywords: {
      type: [String],
      default: [],
    },

    // 9. Status
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Populate: Associated collections list
manufacturerSchema.virtual("collections", {
  ref: "Collection",
  localField: "_id",
  foreignField: "manufacturer",
});

// Virtual Populate: Associated products list
manufacturerSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "manufacturer",
});

// Virtual Populate: Total associated products count
manufacturerSchema.virtual("productsCount", {
  ref: "Product",
  localField: "_id",
  foreignField: "manufacturer",
  count: true,
});

module.exports = mongoose.models.Manufacturer || mongoose.model("Manufacturer", manufacturerSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // 1. Basic Information
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "Product SKU is required"],
      unique: true,
      index: true,
      uppercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      default: "",
    },
    longDescription: {
      type: String,
      trim: true,
      default: "",
    },

    // 2. Relationships
    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
      required: [true, "Product manufacturer association is required"],
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category association is required"],
      index: true,
    },
    collectionRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      default: null,
      index: true,
    },

    // 3. Media
    coverImage: {
      type: String,
      required: [true, "Product cover image is required"],
    },
    galleryImages: {
      type: [String],
      default: [],
    },

    // 4. Technical Details
    material: {
      type: String,
      trim: true,
      default: "",
    },
    finish: {
      type: String,
      trim: true,
      default: "",
    },
    dimensions: {
      type: String,
      trim: true,
      default: "",
    },
    weight: {
      type: String,
      trim: true,
      default: "",
    },
    warranty: {
      type: String,
      trim: true,
      default: "",
    },
    installationType: {
      type: String,
      trim: true,
      default: "",
    },

    // 5. Business Information
    moq: {
      type: Number,
      required: [true, "Minimum Order Quantity (MOQ) is required"],
      min: [1, "MOQ cannot be less than 1"],
      default: 1,
    },
    price: {
      type: Number,
      required: [true, "Indicative price is required"],
      min: [0, "Price cannot be negative"],
    },
    availability: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Made to Order"],
      default: "In Stock",
      index: true,
    },

    // 6. Downloads (relative file paths)
    brochure: {
      type: String,
      default: "",
    },
    datasheet: {
      type: String,
      default: "",
    },
    installationGuide: {
      type: String,
      default: "",
    },
    cadDrawing: {
      type: String,
      default: "",
    },

    // 7. SEO
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

    // 8. Flags
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isTrending: {
      type: Boolean,
      default: false,
      index: true,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
      index: true,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
      index: true,
    },

    // 9. Status
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Populate: associated product variants list
productSchema.virtual("variants", {
  ref: "ProductVariant",
  localField: "_id",
  foreignField: "product",
});

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);

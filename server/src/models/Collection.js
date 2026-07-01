const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Collection name is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Collection slug is required"],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
      required: [true, "Collection manufacturer owner is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

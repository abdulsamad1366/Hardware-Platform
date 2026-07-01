const mongoose = require("mongoose");

const savedProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Saved product user owner reference is required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Saved product reference is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Compound Unique Index: prevents duplicate bookmarks for same product by same user
savedProductSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.models.SavedProduct || mongoose.model("SavedProduct", savedProductSchema);

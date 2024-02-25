const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const productSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    currency: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    currPrice: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    priceHistory: [priceSchema],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    description: { type: String },
    category: { type: String },
    reviewsCount: { type: Number },
    isOutOfStock: { type: Boolean, default: false },
    users: [
      {
        email: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

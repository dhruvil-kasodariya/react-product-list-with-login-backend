const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, require: true },
    productImg: { type: String, require: true, },
    productStatus: { type: String, require: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
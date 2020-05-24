const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  reviews: { type: [Number] },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

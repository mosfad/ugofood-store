const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  url: { type: String, required: true, default: "" },
  reviews: [Number],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

//consider adding comments, ratings and associating them with a _user.id(maybe under `reviews`?)

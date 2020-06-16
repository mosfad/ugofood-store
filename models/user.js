const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, default: "Non provided" },
  /*isVerified: { type: Boolean, default: false },*/
  isOverLimit: { type: Boolean, default: false },
  requestedProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  samplesRequested: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
    },
    {
      review: { type: String },
    },
    {
      headline: { type: String },
    },
    {
      ratings: { type: Number },
    },
  ],
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
    },
    {
      quantity: { type: Number },
    },
    {
      status: { type: String, default: "Clear" },
    },
  ],
  isAdmin: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

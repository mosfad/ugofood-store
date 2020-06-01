const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, default: "Non provided" },
  /*isVerified: { type: Boolean, default: false },*/
  isOverLimit: { type: Boolean, default: false },
  requestedProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  samplesRequested: [
    {
      id: { type: Schema.Types.ObjectId, ref: "Product" },
    },
    {
      review: { type: String },
    },
    {
      ratings: { type: Number },
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

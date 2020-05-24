const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isOverLimit: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

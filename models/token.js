const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const tokenSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, ref: User },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    index: { expires: "1h" },
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;

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
      review: { type: String },
      headline: { type: String },
      ratings: { type: Number },
    },
  ],
  cart: [
    {
      _id: false,
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      // name: { type: String },
      // description: { type: String },
      // url: { type: String },
      quantity: { type: Number },
      status: { type: String },
    },
  ],

  orders: [
    {
      status: { type: String },
      billingDetails: {
        firstName: { type: String },
        lastName: { type: String },
        //phone: {type: String},
        address: { type: String },
        address2: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        country: { type: String, default: "United States" },
      },
      products: [
        {
          name: { type: String },
          quantity: { type: Number },
          price: { type: Number },
        },
      ],
      total: { type: Number },
      createdOrderAt: { type: Date, default: Date.now },
      completedOrderAt: { type: Date, default: Date.now },
    },
  ],

  //currentOrder: { type: Schema.Types.ObjectId },

  isAdmin: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

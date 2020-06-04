const express = require("express");
const userRoutes = require("./users");
const productRoutes = require("./products");
const paymentIntentRoutes = require("./payment_intents");
const router = express.Router();

//User routes
router.use("/users", userRoutes);

//Product routes
router.use("/products", productRoutes);

//payment intent routes
router.use("/payment_intents", paymentIntentRoutes);

module.exports = router;

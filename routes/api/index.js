const express = require("express");
const userRoutes = require("./users");
const productRoutes = require("./products");
const router = express.Router();

//User routes
router.use("/users", userRoutes);

//Product routes
router.use("/products", productRoutes);

module.exports = router;

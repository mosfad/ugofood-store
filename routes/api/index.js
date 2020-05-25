const express = require("express");
const usersRoutes = require("./users");
const productRoutes = require("./products");
const router = express.Router();

router.use("./users", usersRoutes);

router.use("./products", productRoutes);

module.exports = router;

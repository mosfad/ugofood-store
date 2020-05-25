const express = require("express");
const router = express.Router();
const controller = require("../../controllers");

//matches with "/api/products"
router
  .get("/", controller.productsController.findAll)
  .post("/", controller.productsController.createProduct);

//matches with "/api/producuts/:id"
router
  .get("/:id", controller.productsController.findProduct)
  .post("/:id", controller.productsController.updateProduct)
  .delete("/:id", controller.productsController.deleteProduct);

module.exports = router;

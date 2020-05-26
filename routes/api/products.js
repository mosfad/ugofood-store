const express = require("express");
const router = express.Router();
const controller = require("../../controllers");
const productsController = require("../../controllers/productsController");

//matches with "/api/products"
router
  .route("/")
  .get(productsController.findAll)
  .post(productsController.createProduct);

//matches with "/api/producuts/:id"
router
  .route("/:id")
  .get(productsController.findProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;

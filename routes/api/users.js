const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");
const usersController = require("../../controllers/usersController");

//matches with "/api/users"
router.route("/").get(usersController.findAll).post(usersController.createUser);

//matches with "/api/users/:id"
router
  .route("/:id")
  .get(usersController.findOne)
  .patch(usersController.verifyUser)
  .delete(usersController.deleteUser);

module.exports = router;

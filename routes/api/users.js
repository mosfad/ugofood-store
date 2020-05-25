const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");

//matches with "/api/users"
router
  .get("/", controllers.usersController.findAll)
  .post("/", controllers.usersController.createUser);

//matches with "/api/users/:id"
router
  .get("/:id", controllers.usersController.findOne)
  .post("/:id", controllers.usersController.verifyUser)
  .delete("/:id", controllers.usersController.deleteUser);

module.exports = router;

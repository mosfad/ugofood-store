const express = require("express");
const passport = require("passport");
const router = express.Router();
const controllers = require("../../controllers");
const usersController = require("../../controllers/usersController");

// @route  GET api/users
// @desc   Gets all users
// @access Private
router.route("/").get(usersController.findAll);

// @route  Post api/users
// @desc   Registers a user
// @access Public
router.route("/register").post(usersController.registerUser);

// @route  Post api/users
// @desc   Login user / Return JWT Token
// @access Public
router.route("/login").post(usersController.loginUser);

// @route  GET api/users/current
// @desc   Return current user(access to a protected route for the user)
// @access Private
router
  .route("/current")
  .get(
    passport.authenticate("jwt", { session: false }),
    usersController.getUserInfo
  );

// @route  Get api/users/logout
// @desc   Logout user
// @access Public
router.route("/logout").get(usersController.logoutUser);

// @route  Delete api/users/:id
// @desc   Delete user account
// @access Public
router.route("/remove/:id").delete(usersController.deleteUser);

// @route  Post api/users/addreview/:productid
// @desc   Add review from signed-in user.
// @access Public
router.route("/addreview/:productid").post(usersController.addReview);

// @route  Get api/users/addreview/:productid
// @desc   Sample request from signed-in user.
// @access Public
router.route("/requestproduct/:productid").get(usersController.requestSample);

//matches with "/api/users"
//router.route("/").get(usersController.findAll).post(usersController.createUser);

//matches with "/api/users/:id"
// router
//   .route("/:id")
//   .get(usersController.findOne)
//   .patch(usersController.verifyUser)
//   .delete(usersController.deleteUser);

module.exports = router;

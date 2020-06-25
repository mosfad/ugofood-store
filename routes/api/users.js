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

// @route  Get api/users/cart/:userid
// @desc   Get the cart info
// @access Public
router.route("/cart/:userid").get(usersController.getCartInfo);

// @route  Post api/users/cart/:userid
// @desc   Add a product to the cart
// @access Public
router.route("/cart/:userid").post(usersController.incrementCart);

// @route  Delete api/users/cart/:userid
// @desc   Remove product from  the cart
// @access Public
router.route("/cart/:userid/:itemid").delete(usersController.decrementCart);

// @route  Post api/users/cart/update/:userid
// @desc   Update cart item(quantity)
// @access Public
router.route("/cart/update/:userid").post(usersController.updateCartItem);

// @route  Get api/users/order/:userid
// @desc   Get orders
// @access Public
router.route("/order/:userid").get(usersController.getOrders);

// @route  Post api/users/order/:userid
// @desc   Add new order
// @access Public
router.route("/order/:userid").post(usersController.addNewOrder);

// @route  Post api/users/order/update/:userid
// @desc   Update order(status, and date) and empty cart
// @access Public
router.route("/order/update/:userid").post(usersController.updateOrder);

//************ ONLY ADMIN SHOULD ACCESS THIS ROUTE*************** */
// @route  Post api/users/order/clearall/:userid
// @desc   Empty entire list of order!!!
// @access Public
router.route("/order/clearall/:userid").delete(usersController.emptyOrders);

//matches with "/api/users/:id"
// router
//   .route("/:id")
//   .get(usersController.findOne)
//   .patch(usersController.verifyUser)
//   .delete(usersController.deleteUser);

module.exports = router;

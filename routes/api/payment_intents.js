const express = require("express");
const router = express.Router();
//const passport = require("passport");
const paymentsController = require("../../controllers/paymentsController");

// @route  POST api/payment_intents;
// @desc   Creates payment intent
// @access Private
router.route("/").post(paymentsController.PaymentIntent);

module.exports = router;

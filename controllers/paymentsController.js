const express = require("express");
const calculateOrderAmount = require("../helpers/processOrders")
  .calculateOrderAmount;
const secret = require("../config/keys").stripeSecret;
const stripe = require("stripe")(secret);

module.exports = {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client.
  PaymentIntent: async (req, res) => {
    const { items } = req.body;
    const amount = await calculateOrderAmount(items);
    console.log("Payment amount is " + amount);
    // Create a PaymentIntent with the order amount and currency
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.log(error);
    }

    // .catch((err) => {
    //   console.log(err);
    //   payment <= 0
    //     ? res.json("User hasn't entered positive amount")
    //     : res.json(err);
    // });
  },
};

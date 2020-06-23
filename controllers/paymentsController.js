const express = require("express");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const calculateOrderAmount = require("../helpers/processOrders")
  .calculateOrderAmount;
const secret = require("../config/keys").stripeSecret;

const stripe = require("stripe")(secret);
// const nodemailer = require("nodemailer");
// const crypto = require("crypto");
// require("dotenv").config();
// const db = require("../models");
// const validateRegisterInput = require("../validation/register");
// const validateLoginInput = require("../validation/login");

module.exports = {
  /*calculateOrderAmount: (items) => {
    //???where is `items` coming from??????????????????????????????
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client.
    return 1400;
  },*/
  PaymentIntent: async (req, res) => {
    const { items } = req.body;
    const amount = await calculateOrderAmount(items);
    console.log("Payment amount is " + amount);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      //error here!!!! How to call `calculateOrderAmount` inside `PaymentIntent`?????????????? CURRENT ERROR.
      amount: amount,
      currency: "usd",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
};

// app.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;
//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "usd",
//   });
//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const db = require("../models");
const validateRegisterInput = require("../validation/register");

module.exports = {
  findAll: (req, res) => {
    db.User.find(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findOne: (req, res) => {
    db.User.findOne({ _id: req.params.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  createUser: (req, res) => {
    //Todo:
    //1) Generate token; create token
    //2) Create and store token in db
    //3) email token to user.
    //4) Consider verification later.

    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }

    const { name, email, address } = req.body;
    //check whether this account exist in database
    db.User.findOne({ email })
      .then((dbUser) => {
        console.log(dbUser); //remove this later...
        if (dbUser) {
          errors.email = "This email account already exist.";
          res.json({ errors: errors.email });
        }
        //add new account
        db.User.create({ name, email, address })
          .then((dbUser) => {
            //do I generate, store and email token here??? YES!!!

            //create and store token in db
            const tokenDecimal = parseInt(
              crypto.randomBytes(3).toString("hex"),
              16
            );

            db.Token.create({ _userId: dbUser._id, token: tokenDecimal })
              .then((dbToken) => {
                console.log(dbToken);
                //email the token here.
                //create reusable transport object using the default SMTP transport

                let transporter = nodemailer.createTransport({
                  service: "gmail",
                  port: 587,
                  secure: false,
                  auth: {
                    user: process.env.ADMIN_EMAIL,
                    pass: process.env.ADMIN_PASS,
                  },
                  tls: {
                    rejectUnauthorized: false,
                  },
                });

                // verify connection configuration
                transporter.verify(function (error, success) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Server is ready to take our messages");
                  }
                });

                //const trialEmail = "example.com";
                //send mail with defined transport object
                let info = transporter.sendMail(
                  {
                    from: `"Dupe Fadina " <${process.env.ADMIN_EMAIL}>`, //sender address
                    to: `${dbUser.email}`, //list of receivers
                    subject: "Hello",
                    text: `Please enter this code to confirm and receive your sample: ${dbToken.token}`,
                    html: `<b>Please enter this code to confirm and receive your sample: ${dbToken.token}</b>`,
                  },
                  (err, info) => {
                    if (err) {
                      console.log("Mail was unsuccessfully sent");
                      return console.log(err);
                    } else {
                      return console.log(info);
                    }
                  }
                );
              })
              .catch((err) => res.status(422).json(err));

            res.json({ Success: true, msg: "Account successfully created" });
          })
          .catch((err) => res.status(422).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },

  verifyUser: (req, res) => {
    db.Token.findOne(req.body)
      .then((dbToken) => {
        const { token } = req.body;
        //If tokens match, then verify the user.
        if (token === dbToken.token) {
          //update the user's `isVerified` and `requestedProducts`(http://localhost:3001/qprod=.....)
          const productId = req.query.qprod;
          db.User.findOneAndUpdate(
            { _id: req.params.id },
            { isVerified: true, $push: { requestedProducts: productId } }
          ).then((dbUser) => {
            console.log(dbUser);
            //delete the token from db since user has been verified
            db.Token.findOneAndDelete({ token })
              .then((dbToken) => console(dbToken))
              .catch((err) => res.status(422).json(err));
          });
          res.json({ Success: true, msg: "Email was successfully verified" });
        } else {
          res.json({ Failure: true, msg: "Email was not verified" });
        }
      })
      .catch((err) => res.status(422).json(err));
  },

  update: (req, res) => {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  deleteUser: (req, res) => {
    db.User.findOneAndDelete({ _id: req.params.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json);
  },
};

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const crypto = require("crypto");
require("dotenv").config();
const db = require("../models");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
//const { RSA_NO_PADDING } = require("constants");

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

  //logs in user
  loginUser: (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = validateLoginInput(req.body);
    //validate user
    if (!isValid) {
      return res.status(400).json({ errors, isValid });
    }

    db.User.findOne({ email })
      .then((dbUser) => {
        if (!dbUser) {
          errors.email = "User not found";
          return res.json({ email: errors.email });
        }
        //check password
        bcrypt.compare(password, dbUser.password).then((isMatch) => {
          if (isMatch) {
            //User matches,....
            const payload = {
              id: dbUser._id,
              email: dbUser.email,
            };
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: "1h" },
              (err, token) => {
                res.json({ success: true, token: "Bearer " + token });
              }
            );
          } else {
            errors.password = "Password is incorrect";
            return res.json({ password: errors.password });
          }
        });
      })
      .catch((err) => res.status(422).json(err));
  },

  //get authorized user's info
  getUserInfo: (req, res) => {
    res.json({
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    });
  },

  //logs out user
  logoutUser: (req, res) => {
    req.logout();
    res.redirect("/");
  },

  //registers users.
  registerUser: (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    //validate user inputs
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { firstName, lastName, email, password, address, token } = req.body;

    //check whether email is already in the database.
    db.User.findOne({ email })
      .then((dbUser) => {
        if (dbUser) {
          //email exists, so send appropriate message
          errors.email = "Email already exists";
          return res.json({ email: errors.email });
        }

        //save the new user
        let newUser;
        if (token && (token === keys.adminCode || token === keys.ownerCode)) {
          newUser = new db.User({
            firstName,
            lastName,
            email,
            password,
            address,
            isAdmin: true,
          });
        } else {
          newUser = new db.User({
            firstName,
            lastName,
            email,
            password,
            address,
          });
        }

        //hash the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log(err);
            newUser.password = hash;
            //save new user with hashed password
            newUser
              .save()
              .then((user) => {
                res.json({
                  Success: true,
                  msg: "Account successfully created",
                });
              })
              .catch((err) => console.log(err));
          });
        });
      })
      .catch((err) => res.status(422).send("mongoose error finding one email"));
  },

  createUser: (req, res) => {
    //Todo:
    //1) Generate token; create token
    //2) Create and store token in db
    //3) email token to user.???
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
                //email the token here.????
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

  //request sample??????????????????????????????????????????
  requestSample: (req, res) => {
    //
    if (!req.user) {
      return res.json({ failure: "User not logged in" });
    }
    db.User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { samplesRequested: req.body } },
      { new: true }
    )
      .then((dbUser) => {
        //update `isOverLimit` if user has maxed out sample requests.
        // if (dbUser.samplesRequested.length > 11) {
        //   db.User.findOneAndUpdate({ _id: dbUser._id }, { isOverLimit: true })
        //     .then((dbUser) =>
        //       res.json({
        //         Success: "Update was successful, but sample limit reached",
        //       })
        //     )
        //     .catch((err) => res.status(422).json(err));
        // }
        res.json({ Success: "Update was successful" });
      })
      .catch((err) => res.status(422).json(err));
  },

  //add reviews from users who have tried the samples.??????????????????
  addReview: (req, res) => {
    // if (!req.user) {
    //   return res.json({ failure: "User not logged in" });
    // }
    const newEntry = {
      productId: req.params.productid,
      review: req.body.review,
      headline: req.body.headline,
      ratings: req.body.rating,
    };

    db.User.findOneAndUpdate(
      { _id: req.params.userid },
      {
        // $push: { THIS IS WRONG! READ MORE ON THIS!
        //   "productReviews.$.productId": req.params.productid,
        //   "productReviews.$.review": req.body.review,
        //   "productReviews.$.headline": req.body.headline,
        //   "productReviews.$.ratings": req.body.rating,
        // },
        $push: {
          productReviews: newEntry,
        },
      },
      { new: true }
    )
      .then((dbUser) => {
        //filter array to return succesfully added item
        const reviewedProduct = dbUser.productReviews.filter(
          (item, index) => item.productId.toString() === req.params.productid
        );
        res.json(reviewedProduct);
        //res.json(dbUser);
      })
      .catch((err) => res.status(422).json(err));
  },

  //get cart info
  getCartInfo: (req, res) => {
    // if (!req.user) {
    //   return res.json({ failure: "User not logged in" });
    // }
    db.User.findOne({ _id: req.params.userid })
      .populate("cart.productId")
      .then((dbModel) => {
        res.json(dbModel.cart);
      })
      .catch((err) => res.status(422).json(err));
  },

  //add item to the cart
  incrementCart: (req, res) => {
    // if (!req.user) {
    //   return res.json({ failure: "User not logged in" });
    // }
    //console.log(req.params.userid);
    const newEntry = {
      productId: req.body.id,
      // name: req.body.name,
      // description: req.body.description,
      // url: req.body.url,
      quantity: req.body.quantity,
      status: req.body.status,
    };
    db.User.findOneAndUpdate(
      { _id: req.params.userid },
      {
        $push: {
          cart: newEntry,
        },
      },
      { new: true }
    )
      .populate("cart.productId")
      .then((dbUser) => {
        //filter array to return succesfully added item
        const cartItem = dbUser.cart.filter(
          (item, index) => item.productId._id.toString() === req.body.id
        );
        res.json(cartItem);
      })
      .catch((err) => res.status(422).json(err));
  },

  //remove item from the cart(including multiple entries)
  decrementCart: (req, res) => {
    // if (!req.user) {
    //   return res.json({ failure: "User not logged in" });
    // }
    db.User.findOneAndUpdate(
      { _id: req.params.userid },
      {
        $pull: {
          cart: { productId: req.params.itemid },
        },
      }
    )
      .populate("cart.productId")
      .then((dbUser) => {
        //console.log(dbUser);
        //filter array to return succesfully deleted item
        const cartItem = dbUser.cart.filter(
          (item, index) => item.productId._id.toString() === req.params.itemid
        );
        //console.log(cartItem);
        res.json(cartItem);
      })
      .catch((err) => res.status(422).json(err));
  },

  //update cart item(e.g quantity)
  updateCartItem: (req, res) => {
    db.User.findOneAndUpdate(
      { _id: req.params.userid, "cart.productId": req.body.id },
      {
        $set: {
          "cart.$.quantity": req.body.quantity,
        },
      },
      { new: true }
    )
      .populate("cart.productId")
      .then((dbUser) => {
        //console.log(dbUser);
        //filter array to return succesfully updated item
        const cartItem = dbUser.cart.filter(
          (item, index) => item.productId._id.toString() === req.body.id
        );
        //console.log(cartItem);
        res.json(cartItem);
      })
      .catch((err) => res.status(422).json(err));
  },

  //get customer's orders.
  getOrders: (req, res) => {
    db.User.findOne({ _id: req.params.userid })
      .then((dbUser) => res.json(dbUser.orders))
      .catch((err) => res.status(422).json(err));
  },

  //get current order id
  getCurrentOrder: (req, res) => {
    db.User.findOne({ _id: req.params.userid })
      .then((dbUser) => res.json(dbUser.currentOrder))
      .catch((err) => res.status(422).json(err));
  },

  //delete current order
  deleteCurrentOrder: (req, res) => {
    db.User.findOneAndUpdate(
      { _id: req.params.userid },
      {
        $pull: {
          orders: { _id: req.params.itemid },
        },
      }
    )
      .then((dbUser) => {
        // filter array to return deleted order
        const deletedOrder = dbUser.orders.filter(
          (item) => item._id.toString() === req.params.itemid
        );
        // return deleted order.
        res.json(deletedOrder);
        //res.json(dbUser);
      })
      .catch((err) => console.log(err));
  },

  //add new order the customer's `orders` list.
  addNewOrder: (req, res) => {
    db.User.findOneAndUpdate(
      { _id: req.params.userid },
      {
        $push: {
          orders: req.body,
        },
      },
      { new: true }
    )
      .then((dbUser) => {
        //filter array to return succesfully added item ???????????
        //Todo: should use _id here!!!!
        //      and update currentOrder
        //LAST ORDER IN THE ARRAY === CURRENT ORDER!!!
        /*const orderItem = dbUser.orders.filter(
          (item, index) => item.products.name === req.body.products.name
        );*/
        const ordersLength = dbUser.orders.length - 1;
        const newOrder = dbUser.orders[ordersLength];
        db.User.findOneAndUpdate(
          { _id: req.params.userid },
          {
            currentOrder: newOrder._id,
          },
          { new: true }
        ).then((dbCurrent) => {
          //console.log(dbCurrent)
          res.json([newOrder]);
        });
      })
      .catch((err) => res.status(422).json(err));
  },

  //update status, card details and completion date of an order.
  updateOrder: (req, res) => {
    db.User.findOneAndUpdate(
      { _id: req.params.userid, "orders._id": req.body.id },
      {
        $set: {
          "orders.$.status": req.body.status,
          "orders.$.completedOrderAt": req.body.completedOrderAt,
          "orders.$.cardDetails": req.body.cardDetails,
        },
      },
      { new: true }
    )
      .then((dbUser) => {
        // Empty cart on completed order.
        db.User.findOneAndUpdate(
          { _id: req.params.userid },
          {
            $set: {
              cart: [],
            },
            currentOrder: null,
          },
          { new: true }
        ).then((dbLatest) => {
          // filter array to update status
          const orderItem = dbLatest.orders.filter(
            (item) => item._id.toString() === req.body.id
          );
          console.log(orderItem);
          // Todo: Send success order email to the customer
          // Mailgun credentials
          const auth = {
            auth: {
              api_key: keys.mailgunAPIKey,
              domain: keys.mailgunDomain,
            },
          };

          // create transport object with mail gun service.
          const nodemailerMailgun = nodemailer.createTransport(mg(auth));

          // send mail with defined transport object
          nodemailerMailgun.sendMail(
            {
              from: `"Dupe Fadina " <${keys.adminEmail}>`, //sender address
              to: `${dbUser.email}`, //list of receivers
              subject: "Hello",
              text: `Thanks! Order # ${orderItem[0]._id} was received`,
              html: `<b>Thanks! Order # ${orderItem[0]._id} was received`,
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

          res.json(orderItem);
        });
        //console.log(orderItem);
        //res.json(orderItem);
      })
      .catch((err) => res.status(422).json());
  },

  //empty cart on completed order???
  emptyOrders: (req, res) => {
    db.User.findOneAndUpdate(
      { _id: req.params.userid },
      {
        $set: {
          orders: [],
        },
      },
      { new: true }
    )
      .then((dbUser) => res.json(dbUser))
      .catch((err) => console.log(err));
  },

  emptyIncompleteOrders: (req, res) => {},
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

// $push: {
//   "cart.$.productId": req.body.id,
//   "cart.$.name": req.body.name,
//   "cart.$.description": req.body.description,
//   "cart.$.url": req.body.url,
//   "cart.$.quantity": req.body.quantity,
//   "cart.$.status": req.body.status,
// }

// $pull: {
//   "cart.$.productId": req.body.id,
//   "cart.$.quantity": req.body.quantity,
//   "cart.$.status": req.body.status,
// },

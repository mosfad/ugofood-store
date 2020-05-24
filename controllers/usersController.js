const express = require("express");
const crypto = require("crypto");
const db = require("../models");

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

  create: (req, res) => {
    db.User.create(req.body)
      .then((dbUser) => {
        res.json(dbModel);
        //Todo:
        //1) Generate token; create token
        //2) Create and store token in db
        //3) email token to user.
        //4) Consider verification later.

        //create and store token in db
        const tokenDecimal = parseInt(
          crypto.randomBytes(3).toString("hex"),
          16
        );
        db.Token.create({
          _userId: dbUser._id,
          token: crypto.randomBytes(3).toString,
        });
      })
      .catch((err) => res.status(422).json(err));
  },

  update: (req, res) => {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  delete: (req, res) => {
    db.User.findOneAndDelete({ _id: req.params.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json);
  },
};

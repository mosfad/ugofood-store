import React, { Component } from "react";
import Agreement from "../components/Agreement";
import WelcomeMessage from "../components/WelcomeMessage";
import ShipForm from "../components/ShipForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
//import "../style.css";
import "../App.css";
//const key = require("../../../config/keys");

// Call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_ETCveDpi7VkZLFOGMONDOmA500jB2Ad4nO");

const ProductRequest = () => {
  return (
    <div className="ui container sign-up">
      <WelcomeMessage />
      <ShipForm />

      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
      <br />
      <Agreement />
    </div>
  );
};

export default ProductRequest;

import React, { Component } from "react";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { fetchUser, fetchCart, autoSignIn } from "../actions";
import ShipForm from "../components/ShipForm";
import Agreement from "../components/Agreement";
import SignupMessage from "../components/SignupMessage";

//import "../style.css";
import "../App.css";
//const key = require("../../../config/keys");

// Call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_ETCveDpi7VkZLFOGMONDOmA500jB2Ad4nO");

class CheckoutOrder extends Component {
  componentDidMount() {
    //sign in authd user in order to get cart info.
    (async () => {
      await this.authenticateUser();
      if (this.props.isSignedIn && this.props.userId.length > 0) {
        this.props.fetchCart(this.props.userId[0]);
      }
    })();
  }

  authenticateUser = async () => {
    // retrieve token in local storage
    const token = localStorage.getItem("userToken");
    // attempt to fetch user with valid token.
    if (token && this.props) {
      // get user info from server
      try {
        await this.props.fetchUser(token);
        // auto-sign in user successfully fetched from server
        console.log(this.props.userId);
        console.log(typeof this.props.userId);
        if (this.props.userId.length > 0 && !this.props.isSignedIn) {
          this.props.autoSignIn(token);
        }
      } catch (err) {
        console.log(err);
        console.log("User must manually sign in");
      }
    }
  };

  getOrderTotal = () => {
    //Sum displayed for user's benefit; actual tally is done in server.
    let sum = 0;
    for (let eachItem of this.props.cart.items) {
      sum += eachItem.productId.price * eachItem.quantity;
    }
    console.log(sum);
    return sum;
  };

  render() {
    console.log(this.props.cart.items);
    return (
      <div className="ui container sign-up">
        <h2>Checkout Order</h2>
        <div className="ui divider"></div>
        <ShipForm total={this.getOrderTotal()} />

        <Elements stripe={promise}>
          <CheckoutForm orderItems={this.props.cart.items} />
        </Elements>
        <br />
        <Agreement />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    cart: state.cart,
    userId: Object.keys(state.user),
  };
};
export default connect(mapStateToProps, { autoSignIn, fetchCart, fetchUser })(
  CheckoutOrder
);

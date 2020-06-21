import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateCartQty,
  removeFromCart,
  fetchCart,
  fetchUser,
  autoSignIn,
} from "../actions";
import CartList from "../components/CartList";
import "../style.css";
//import CartDetails from "../components/CartDetails";

class ShoppingCart extends Component {
  //DON'T FORGET TO PASS STORE AS PROPS TO CartList....
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
        if (this.props.userId.length > 0 && !this.props.isSignedIn) {
          this.props.autoSignIn(token);
        }
      } catch (err) {
        console.log(err);
        console.log("User must manually sign in");
      }
    }
  };

  onChangeCartQty = (user, payload) => {
    this.props.updateCartQty(user, payload);
  };

  onDeleteCartItem = (user, payload) => {
    this.props.removeFromCart(user, payload);
  };

  // state = { cartInfo: [] };
  // handleShoppingCart = (cartInfo) => {
  //   this.setState((state) => {
  //     return { cartInfo: state.cartInfo.push(cartInfo) };
  //   });
  // };

  render() {
    if (!this.props.cart) {
      return <div></div>;
    }
    const cartInfo = this.props.cart.items;
    console.log(cartInfo);
    return (
      <div>
        <h1 className="ui container" id="shoppingcart-header">
          Shopping Cart
        </h1>
        <div className="ui container divider"></div>

        <CartList
          cartInfo={cartInfo}
          userId={this.props.userId[0]}
          onChangeCartQty={this.onChangeCartQty}
          onDeleteCartItem={this.onDeleteCartItem}
        />
        <div className="ui container divider"></div>
        <div className="ui container right aligned shoppingcart-subtotal">
          <button className="ui button shoppingcart-button">
            Proceed to checkout
          </button>
          Subtotal(2 items):&nbsp;&nbsp; $22.00
        </div>
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
export default connect(mapStateToProps, {
  updateCartQty,
  removeFromCart,
  fetchCart,
  fetchUser,
  autoSignIn,
})(ShoppingCart);

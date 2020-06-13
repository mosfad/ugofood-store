import React, { Component } from "react";
import CartList from "../components/CartList";
import "../style.css";
//import CartDetails from "../components/CartDetails";

class ShoppingCart extends Component {
  state = { cartInfo: [] };
  handleShoppingCart = (cartInfo) => {
    this.setState((state) => {
      return { cartInfo: state.cartInfo.push(cartInfo) };
    });
  };

  render() {
    return (
      <div>
        <h1 className="ui container" id="shoppingcart-header">
          Shopping Cart
        </h1>
        <div className="ui container divider"></div>

        <CartList onShoppingCart={this.handleShoppingCart} />
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

export default ShoppingCart;

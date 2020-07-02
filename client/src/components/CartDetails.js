import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./cartStyle.css";

class CartDetails extends Component {
  static propTypes = {
    onChangeCartQty: PropTypes.func,
    onDeleteCartItem: PropTypes.func,
  };

  handleBlur = async (event) => {
    //update cart item qty and price
    const { name, value } = event.target;
    // console.log(`${name} = ${value}`);
    //update db with correct qty
    // console.log(this.props);
    const productData = { id: this.props.item.productId._id, quantity: value };
    await this.props.onChangeCartQty(this.props.userId, productData);
    //window.location.reload(false);
  };

  handleClick = async (event) => {
    const productData = { id: this.props.item.productId._id };
    //console.log(window.location.href);
    await this.props.onDeleteCartItem(
      this.props.userId,
      this.props.item.productId._id
    );
    //window.location.reload(false);
  };

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.item.productId.url} />
        </div>

        <div className="content">
          <div className="product-container">
            <a className="product-name">{this.props.item.productId.name}</a>
            <div className="product-price">
              ${this.props.item.productId.price * this.props.item.quantity}
            </div>
          </div>

          <div className="description">
            <p>{this.props.item.productId.description}</p>
          </div>
          <div className="extra">
            <div className="ui labeled input">
              <div className="ui label">Qty</div>
              <input
                type="number"
                name="quantity"
                min="1"
                placeholder={this.props.item.quantity}
                max="1000"
                onBlur={this.handleBlur}
              />
            </div>
          </div>
          <div className="extra">
            {" "}
            <a className="delete-product" onClick={this.handleClick}>
              <i className="large close icon"></i> Delete Item
            </a>
            {/* <div className="ui vertical animated red large button" tabindex="0">
                  <div className="hidden content">Delete Item</div>
                  <div className="visible content">
                    <i className="trash alternate icon"></i>
                  </div>
                </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default CartDetails;

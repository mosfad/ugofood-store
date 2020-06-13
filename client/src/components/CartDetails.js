import React, { useState, useEffect } from "react";
import "./cartStyle.css";

const CartDetails = (props) => {
  return (
    <div className="item">
      <div className="image">
        <img src="https://picsum.photos/200/200?grayscale" />
      </div>

      <div className="content">
        <div className="product-container">
          <a className="product-name">{props.item.name}</a>
          <div className="product-price">{props.item.price}</div>
        </div>

        <div className="description">
          <p>{props.item.description}</p>
        </div>
        <div className="extra">
          <div className="ui labeled input">
            <div className="ui label">Qty</div>
            <input type="number" name="quantity" min="1" max="1000" />
          </div>
        </div>
        <div className="extra">
          {" "}
          <a className="delete-product">X &nbsp;&nbsp; Delete Item</a>
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
};

export default CartDetails;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./cartStyle.css";

const ItemDetails = (props) => {
  const { item, userId } = props;
  return (
    <div className="item">
      <div className="ui tiny image">
        <img src={item.url} />
      </div>
      <div className="content">
        <div className="item-container">
          <a className="header item-name">{item.name}</a>
          <div className="item-price">{`$${item.price * item.quantity}`}</div>
        </div>
        <div className="description item-description">
          <p>{item.description}</p>
        </div>
        <div className="extra item-qty">
          <p>{`Qty: ${item.quantity}`}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;

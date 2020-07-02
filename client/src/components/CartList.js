import React, { useState, useEffect } from "react";
import CartDetails from "./CartDetails";

const CartList = (props) => {
  //fetch products from database or homepage.
  const renderCartList = () => {
    return props.cartInfo.map((item, index) => {
      return (
        <CartDetails
          key={`${index}item.id`}
          item={item}
          userId={props.userId}
          onChangeCartQty={props.onChangeCartQty}
          onDeleteCartItem={props.onDeleteCartItem}
        />
      );
    });
  };
  return <div className="ui divided items container">{renderCartList()}</div>;
};

export default CartList;

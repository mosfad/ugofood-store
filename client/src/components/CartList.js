import React, { useState, useEffect } from "react";
import CartDetails from "./CartDetails";

const CartList = (props) => {
  const [items, setItems] = useState([]);

  const trialInfo = [
    {
      id: 1000,
      name: "Jollof Rice",
      url: "https://picsum.photos/200/200?grayscale",
      price: "$12.00",
      description:
        "Yummy Jollof rice made with chicken and fried plantains is so nutritious and delicious.",
    },
    {
      id: 1001,
      name: "Esiewu",
      url: "https://picsum.photos/200/200?grayscale",
      price: "$10.00",
      description: "Tasty goat meat cooked in a spicy and tasty sauce",
    },
  ];

  //fetch products from database or homepage.
  const renderCartList = () => {
    return trialInfo.map((item) => {
      console.log(item);
      return <CartDetails key={item.id} item={item} />;
    });
  };
  return <div className="ui divided items container">{renderCartList()}</div>;
};

export default CartList;

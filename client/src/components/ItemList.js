import React, { useState, useEffect } from "react";
import ItemDetails from "./ItemDetails";

const ItemList = (props) => {
  //fetch products from database or homepage.
  const renderList = () => {
    return props.itemInfo.map((item, index) => {
      return (
        <ItemDetails key={`item${index}`} item={item} userId={props.userId} />
      );
    });
  };
  return <div className="ui divided items container">{renderList()}</div>;
};

export default ItemList;

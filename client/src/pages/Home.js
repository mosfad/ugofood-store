import React, { Component } from "react";
import Products from "../components/ProductDetail";

class Home extends Component {
  render() {
    return (
      <div className="ui container">
        <h1>Homepage</h1>
        <Products />
      </div>
    );
  }
}

export default Home;

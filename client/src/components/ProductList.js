import React, { Component } from "react";
import { Rating } from "semantic-ui-react";
import { connect } from "react-redux";
import ProductDetail from "./ProductDetail";
import { fetchProducts } from "../actions";
import "./productStyles.css";

class ProductList extends Component {
  state = {
    products: [
      {
        name: "Jollof Rice with Beef",
        description: "Savory and spicy rice mixed with chunks of beef",
        ratings: 4,
        image: "https://picsum.photos/400/400?grayscale",
      },
      {
        name: "Goat Meat Soup",
        description: "Hot and spicy soup with delicious chunks of goat meat",
        ratings: 3,
        image: "https://picsum.photos/400/400?grayscale",
      },
      {
        name: "Fried Rice with Chicken",
        description: "Savory and spicy rice mixed with chunks of beef",
        ratings: 4,
        image: "https://picsum.photos/400/400?grayscale",
      },
      {
        name: "Esiewu",
        description: "Savory and spicy rice mixed with chunks of beef",
        ratings: 4,
        image: "https://picsum.photos/400/400?grayscale",
      },
      {
        name: "Peppersoup",
        description: "Hot and spicy soup with delicious chunks of goat meat",
        ratings: 3,
        image: "https://picsum.photos/400/400?grayscale",
      },
      {
        name: "Beef Jerky",
        description: "Savory and spicy rice mixed with chunks of beef",
        ratings: 4,
        image: "https://picsum.photos/400/400?grayscale",
      },
    ],
  };
  //   componentDidMount() {
  //     this.props.fetchProducts();
  //     console.log(this.props);
  //   }

  renderListOne = (products) => {
    console.log(products);
    return products
      .filter((product, index) => index < 3)
      .map((product, index) => {
        console.log(product);
        console.log(index);
        return (
          <div
            key={index}
            className="sixteen wide mobile five wide tablet five wide computer column"
          >
            <ProductDetail product={product} />
          </div>
        );
      });
  };

  renderListTwo = (products) => {
    console.log(products);
    return products
      .filter((product, index) => index > 2 && index < 6)
      .map((product, index) => {
        console.log(product);
        console.log(index);
        return (
          <div
            key={index}
            className="sixteen wide mobile five wide tablet five wide computer column"
          >
            <ProductDetail product={product} />
          </div>
        );
      });
  };

  render() {
    if (!this.props.products) {
      return <div></div>;
    }
    // const { storeProducts } = this.props.products;
    return (
      <div className="ui internally celled grid product-detail">
        <div className="centered row">
          {this.renderListOne(this.props.products.storeProducts)}
        </div>
        <div className="centered row">
          {this.renderListTwo(this.props.products.storeProducts)}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   console.log(state);
//   return { products: state.products };
// };
// export default connect(mapStateToProps, { fetchProducts })(ProductList);

export default ProductList;

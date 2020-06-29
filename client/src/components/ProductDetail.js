import React, { Component } from "react";
import { Rating } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, updateCartQty } from "../actions";
import "./productStyles.css";
class ProductDetail extends Component {
  // trialInfo = [{

  //     id: 1000,
  //     name: "Jollof Rice",
  //     url: "https://picsum.photos/200/200?grayscale",
  //     price: "$12.00",
  //     description:
  //       "Yummy Jollof rice made with chicken and fried plantains is so nutritious and delicious.",
  //   },
  //   {
  //     id: 1001,
  //     name: "Esiewu",
  //     url: "https://picsum.photos/200/200?grayscale",
  //     price: "$10.00",
  //     description: "Tasty goat meat cooked in a spicy and tasty sauce",
  //   },
  // ];
  handleSampeRequest = (e) => {
    //e.preventDefault() is preventing Link from executing normal
    //behavior.
    const { value, name } = e.target;
    if (!this.props.isSignedIn) {
      alert("Please sign-in or sign-up to order a sample.");
    } else {
      const userId = Object.keys(this.props.userId)[0];
      // add to sample to authd user's cart.
      const productValues = {
        id: this.props.product._id,
        quantity: 1,
        status: "active",
      };
      // check whether product is already in the cart
      const arrWithProduct = this.props.cart.items.filter(
        (item) => item.productId._id === productValues.id
      );
      console.log(arrWithProduct);

      if (arrWithProduct.length === 0) {
        // add product to the cart; it's not inside the cart
        this.props.addToCart(userId, productValues);
      }
      // alert customer if product is already in cart
      else {
        //
        alert(
          `${arrWithProduct[0].productId.name} is already in the cart. You can change its quantity there.`
        );
      }

      // otherwise, add product to cart

      //this.props.addToCart(userId, productValues);
    }
  };

  handleFeedbackRequest = (e) => {
    //
    const { value, name } = e.target;
    if (!this.props.isSignedIn && name === "feedback") {
      alert("Please sign-in or sign-up to give a review. Thanks!");
    }
  };

  // handleClick = (e) => {
  //   //e.preventDefault() is preventing Link from executing normal
  //   //behavior.
  //   //e.preventDefault();
  //   const { value, name } = e.target;

  //   if (!this.props.isSignedIn) {
  //     alert("Please sign-in or sign-up to order a sample.");
  //   } else {
  //     // add to sample to authd user's cart.
  //     const productValues = {
  //       id: this.props.product._id,
  //       quantity: 1,
  //       status: "active",
  //     };
  //     // check whether product is already in the cart
  //     if (this.props.cart.items.length > 0) {
  //       const arrWithProduct = this.props.cart.items.filter(
  //         (item) => item.productId === productValues.id
  //       );
  //       // increment product qty if already in cart
  //       if (arrWithProduct.length !== 0) {
  //       } else {
  //         // otherwise, add product to cart
  //         const userId = Object.keys(this.props.userId)[0];
  //         this.props.addToCart(userId, productValues);
  //       }
  //     }
  //   }
  // };

  render() {
    if (!this.props.product) {
      return <div></div>;
    }
    const { name, url, description, ratings, _id } = this.props.product;
    const feedbackUrl = this.props.isSignedIn ? `/feedback/${_id}` : "/";
    const cartUrl = this.props.isSignedIn ? `/cart/${_id}` : "/";
    return (
      <React.Fragment>
        <img className="productdetail-img" src={url} />
        <h3>{name}</h3>
        <div className="content">
          <div className="description product">{description}</div>
          {/* <div className="extra">Reviews</div> */}

          <div className="extra product-btn">
            <Link
              to={cartUrl}
              name="add-to-cart"
              productid={_id}
              onClick={this.handleSampeRequest}
              className="ui button teal"
            >
              Get Sample
            </Link>
            <Link
              to={feedbackUrl}
              name="feedback"
              productid={_id}
              onClick={this.handleFeedbackRequest}
              className="ui button"
            >
              Feedback
            </Link>
          </div>

          <div className="extra ratings">
            Ratings: &nbsp;
            <Rating rating={ratings} maxRating={5} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // Get sign-in status, and the id of the product requested(ownProps??)
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.user,
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { addToCart })(ProductDetail);

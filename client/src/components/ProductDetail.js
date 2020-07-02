import React, { Component } from "react";
import { Rating } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, fetchProductReviewed } from "../actions";
import "./productStyles.css";
class ProductDetail extends Component {
  handleProductRequest = (e) => {
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
      // console.log(arrWithProduct);

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
    }
  };

  handleFeedbackRequest = (e) => {
    //const { value, name } = e.target;
    const { name, description, url, _id } = this.props.product;
    if (!this.props.isSignedIn) {
      alert("Please sign-in or sign-up to give a review. Thanks!");
    } else {
      const feedbackProductDetails = {
        name,
        description,
        url,
        _id,
      };
      this.props.fetchProductReviewed(feedbackProductDetails);
    }
  };

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
              onClick={this.handleProductRequest}
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

export default connect(mapStateToProps, { addToCart, fetchProductReviewed })(
  ProductDetail
);

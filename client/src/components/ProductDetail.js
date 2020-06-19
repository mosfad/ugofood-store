import React, { Component } from "react";
import { Rating } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
  handleSampeRequest = () => {
    //
  };

  handleFeedbackRequest = () => {
    //
  };

  handleClick = (e) => {
    //
    e.preventDefault();
    const { value, name } = e.target;
    if (!this.props.isSignedIn && name === "feedback") {
      alert("Please sign-in or sign-up to give a review. Thanks!");
    } else if (!this.props.isSignedIn && name === "ordersample") {
      alert("Please sign-in or sign-up to order a sample.");
    }
  };

  render() {
    if (!this.props.product) {
      return <div></div>;
    }
    const { name, url, description, ratings, _id } = this.props.product;
    const feedbackUrl = this.props.isSignedIn ? `/feedback/${_id}` : "/";
    const getSampleUrl = this.props.isSignedIn ? `/ordersample/${_id}` : "/";
    return (
      <React.Fragment>
        <img className="productdetail-img" src={url} />
        <h3>{name}</h3>
        <div className="content">
          <div className="description product">{description}</div>
          {/* <div className="extra">Reviews</div> */}

          <div className="extra product-btn">
            <Link
              to={getSampleUrl}
              name="ordersample"
              productid={_id}
              onClick={this.handleClick}
              className="ui button teal"
            >
              Get Sample
            </Link>
            <Link
              to={feedbackUrl}
              name="feedback"
              productid={_id}
              onClick={this.handleClick}
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
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, null)(ProductDetail);

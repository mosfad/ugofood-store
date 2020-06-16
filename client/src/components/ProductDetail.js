import React, { Component } from "react";
import { Rating } from "semantic-ui-react";
import { connect } from "react-redux";
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
  render() {
    if (!this.props.product) {
      return <div></div>;
    }
    const { name, url, description, ratings } = this.props.product;
    return (
      <React.Fragment>
        <img className="productdetail-img" src={url} />
        <h3>{name}</h3>
        <div className="content">
          <div className="description product">{description}</div>
          {/* <div className="extra">Reviews</div> */}

          <div className="extra product-btn">
            <button
              className="ui button teal"
              onClick={this.handleSampeRequest}
            >
              Get Sample
            </button>
            <button className="ui button" onClick={this.handleFeedbackRequest}>
              Feedback
            </button>
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

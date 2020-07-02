import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, autoSignIn, addProductReview } from "../actions";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackMessage from "../components/FeedbackMessage";
import Header from "../components/Header";
import "../style.css";

class Feedback extends Component {
  componentDidMount() {
    (async () => {
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          await this.props.fetchUser(token);
          // console.log(this.props.user);
          //if user was successfully fetched from server, auto-sign the user.
          if (
            Object.keys(this.props.user).length === 1 &&
            !this.props.isSignedIn
          ) {
            this.props.autoSignIn(token);
          }
        } catch (err) {
          console.log(err);
          console.log("User must manually sign in, since token is invalid");
        }
      }
    })();
  }

  onAddReview = async (userId, productId, reviewForm) => {
    await this.props.addProductReview(userId, productId, reviewForm);
    // console.log(this.props.user.review);
    const storeReview = this.props.user.review;
    const targetReview = storeReview[storeReview.length - 1];
    if (
      targetReview.productId === productId &&
      targetReview.headline === reviewForm.headline &&
      targetReview.review === reviewForm.review &&
      targetReview.rating === reviewForm.ratings
    ) {
      alert("Thanks! You have successfully sent a review!");
    }
  };

  render() {
    if (!this.props.user.feedbackProduct) {
      return <div></div>;
    }
    const { name, description, url, _id } = this.props.user.feedbackProduct;
    return (
      <div>
        <div className="ui container feedbackmessage">
          <FeedbackMessage />
        </div>
        <div className="ui container feedbackProduct">
          <img className="ui medium image feedback-img" src={url} />
          <h3>{name}</h3>
          <div className="content">
            <div className="description feedback">{description}</div>
          </div>
        </div>
        <br />
        <div className="ui container divider feedback"></div>
        <br />
        <div className="ui container feedback">
          <FeedbackForm
            feedbackProductId={_id}
            userId={Object.keys(this.props.user)[0]}
            onAddReview={this.onAddReview}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    isSignedIn: state.auth.isSignedIn,
    token: state.auth.userToken,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  autoSignIn,
  addProductReview,
})(Feedback);

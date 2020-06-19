import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, autoSignIn } from "../actions";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackMessage from "../components/FeedbackMessage";
import Header from "../components/Header";

class Feedback extends Component {
  componentDidMount() {
    (async () => {
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          await this.props.fetchUser(token);
          console.log(this.props.user);
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

  // componentDidUpdate(prevProps, prevState) {
  //     console.log(prevProps);
  //     console.log(this.props);
  //     //user manually signed in, so fetch the user.
  //     if (
  //       this.props.isSignedIn &&
  //       !prevProps.isSignedIn &&
  //       Object.keys(this.props.user).length === 0
  //     ) {
  //       //const token = localStorage.getItem("userToken");
  //       if (this.props.token) {
  //         //UPDATE TOKEN SINCE LOGINMODAL IS CAUSING UPDATE WARNINGS.
  //         localStorage.setItem("userToken", this.props.token);
  //         console.log(this.props.token);
  //         this.props.fetchUser(this.props.token);
  //       }
  //     }
  //     //user manually signed off, so remove user.
  //   }

  render() {
    return (
      <div>
        <div className="ui container feedbackmessage">
          <FeedbackMessage />
        </div>

        <div className="ui container feedback">
          <FeedbackForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    isSignedIn: state.auth.isSignedIn,
    token: state.auth.userToken,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  autoSignIn,
})(Feedback);

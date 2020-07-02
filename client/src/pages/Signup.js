import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../actions";
import history from "../utils/history";
import Agreement from "../components/Agreement";
import SignupForm from "../components/SignupForm";
import SignupMessage from "../components/SignupMessage";

class Signup extends Component {
  componentDidMount() {
    console.log(this.props.match);
  }

  onSignup = async (userName = "", formValues) => {
    await this.props.signUp(formValues);
    if (
      this.props.auth.Success &&
      this.props.auth.msg === "Account successfully created"
    ) {
      alert(`Congrats ${userName}! Your account was successfully created.`);
      history.push("/");
    }
  };

  render() {
    return (
      <div className="ui container sign-up">
        <SignupMessage />

        <SignupForm onSignup={this.onSignup} />
        <br />
        <Agreement />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { signUp })(Signup);

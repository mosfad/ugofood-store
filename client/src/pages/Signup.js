import React, { Component } from "react";
import Agreement from "../components/Agreement";
import SignupForm from "../components/SignupForm";
import "../style.css";
import WelcomeMessage from "../components/WecomeMessage";

class Signup extends Component {
  render() {
    return (
      <div className="ui container sign-up">
        <WelcomeMessage />

        <SignupForm />
        <br />
        <Agreement />
      </div>
    );
  }
}

export default Signup;

import React, { Component } from "react";
import Agreement from "../components/Agreement";
import AltSignupForm from "../components/AltSignupForm";
import "../style.css";
import WelcomeMessage from "../components/WecomeMessage";

class Signup extends Component {
  render() {
    return (
      <div className="ui container sign-up">
        <WelcomeMessage />

        <AltSignupForm />
        <br />
        <Agreement />
      </div>
    );
  }
}

export default Signup;

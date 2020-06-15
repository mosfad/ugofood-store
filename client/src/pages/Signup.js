import React, { Component } from "react";
import Agreement from "../components/Agreement";
import SignupForm from "../components/SignupForm";
import "../style.css";
import SignupMessage from "../components/SignupMessage";

class Signup extends Component {
  render() {
    return (
      <div className="ui container sign-up">
        <SignupMessage />

        <SignupForm />
        <br />
        <Agreement />
      </div>
    );
  }
}

export default Signup;

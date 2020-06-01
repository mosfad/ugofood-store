import React, { Component } from "react";
import SignupForm from "../components/SignupForm";
import AltSignupForm from "../components/AltSignupForm";

class Signup extends Component {
  render() {
    return (
      <div>
        <div>Create a new Account and enjoy free samples!</div>

        <AltSignupForm />
      </div>
    );
  }
}

export default Signup;

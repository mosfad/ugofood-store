import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  //replace login tab with logout if user is signed in.
  state = { homeStatus: "", signupStatus: "", logStatus: "" };

  handleClick = () => {
    this.setState({
      homeStatus: "active teal",
      signupStatus: "",
      logStatus: "",
    });
  };

  handleSignup = () => {
    this.setState({
      homeStatus: "",
      signupStatus: "active teal",
      logStatus: "",
    });
  };

  handleLogStatus = () => {
    this.setState({
      homeStatus: "",
      signupStatus: "",
      logStatus: "active teal",
    });
  };

  render() {
    let userStatus = "Login";
    return (
      <div className="ui secondary pointing menu">
        <Link
          to="/"
          className={`item ${this.state.homeStatus}`}
          onClick={this.handleClick}
        >
          Home
        </Link>
        <div className="right menu">
          <Link
            to="/Signup"
            className={`item ${this.state.signupStatus}`}
            onClick={this.handleSignup}
          >
            Signup
          </Link>
          <Link
            to="/"
            className={`item ${this.state.logStatus}`}
            onClick={this.handleLogStatus}
          >
            {userStatus}
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;

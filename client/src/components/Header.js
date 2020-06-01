import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style.css";

class Header extends Component {
  //replace login tab with logout if user is signed in.
  state = { homeStatus: "", signupStatus: "", logStatus: "" };

  handleClick = () => {
    this.setState({
      homeStatus: "active white",
      signupStatus: "",
      logStatus: "",
    });
  };

  handleSignup = () => {
    this.setState({
      homeStatus: "",
      signupStatus: "active white",
      logStatus: "",
    });
  };

  handleLogStatus = () => {
    this.setState({
      homeStatus: "",
      signupStatus: "",
      logStatus: "active white",
    });
  };

  render() {
    let userStatus = "Login";
    return (
      <div className="ui secondary pointing menu header-home">
        <Link
          to="/"
          className={`item a-header ${this.state.homeStatus}`}
          onClick={this.handleClick}
        >
          Home
        </Link>
        <div className="right menu">
          <Link
            to="/Signup"
            className={`item a-header ${this.state.signupStatus}`}
            onClick={this.handleSignup}
          >
            Signup
          </Link>
          <Link
            to="/"
            className={`item a-header ${this.state.logStatus}`}
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

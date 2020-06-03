import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style.css";

class Header extends Component {
  //replace login tab with logout if user is signed in.
  state = { homeStatus: "", signupStatus: "", logStatus: "", shipStatus: "" };

  handleClick = () => {
    this.setState({
      homeStatus: "active",
      signupStatus: "",
      logStatus: "",
      shipStatus: "",
    });
  };

  handleSignup = () => {
    this.setState({
      homeStatus: "",
      signupStatus: "active",
      logStatus: "",
      shipStatus: "",
    });
  };

  handleLogStatus = () => {
    this.setState({
      homeStatus: "",
      signupStatus: "",
      logStatus: "active",
      shipStatus: "",
    });
  };

  handleShip = () => {
    this.setState({
      homeStatus: "",
      signupStatus: "",
      logStatus: "",
      shipStatus: "active",
    });
  };

  render() {
    let userStatus = "Login";
    return (
      <div className="ui menu header-home">
        <Link
          to="/"
          className={`${this.state.homeStatus} item a-header`}
          onClick={this.handleClick}
        >
          Home
        </Link>
        <div className="right menu">
          <Link
            to="/signup"
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
          <Link
            to="/product/request"
            className={`item a-header ${this.state.shipStatus}`}
            onClick={this.handleShip}
          >
            Samples
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;

// class Header extends Component {
//   render() {
//     let userStatus = "Log in";
//     return (
//       <div className="ui menu">
//         <a className="item">Browse</a>
//         <Link to="/" className="item">
//           Home
//         </Link>
//         <div className="right menu">
//           <Link to="/signup" className="item" onClick={this.handleSignup}>
//             Sign Up
//           </Link>
//           <Link to="/" className="item" onClick={this.handleClick}>
//             Login
//           </Link>
//           <Link
//             to="/product/request"
//             className="item"
//             onClick={this.handleShip}
//           >
//             Get Samples
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

//export default Header;

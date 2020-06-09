import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import ModalContainer from "./ModalContainer";
import RandomModal from "./RandomModal";
import "../style.css";

class Header extends Component {
  //replace login tab with logout if user is signed in.
  state = {
    homeStatus: "",
    signupStatus: "",
    logStatus: "",
    shipStatus: "",
    cartStatus: "",
  };

  handleClick = () => {
    this.setState({
      homeStatus: "active",
      signupStatus: "",
      logStatus: "",
      shipStatus: "",
      cartStatus: "",
    });
  };

  handleSignup = () => {
    this.setState({
      homeStatus: "",
      signupStatus: "active",
      logStatus: "",
      shipStatus: "",
      cartStatus: "",
    });
  };

  handleLogStatus = () => {
    this.setState({
      homeStatus: "",
      signupStatus: "",
      logStatus: "active",
      shipStatus: "",
      cartStatus: "",
    });
  };

  handleShip = () => {
    this.setState({
      homeStatus: "",
      signupStatus: "",
      logStatus: "",
      shipStatus: "active",
      cartStatus: "",
    });
  };

  handleCart = () => {
    this.setState({
      homeStatus: "",
      signupStatus: "",
      logStatus: "",
      shipStatus: "",
      cartStatus: "active",
    });
  };

  render() {
    let userStatus = "Login";
    let id = 1; //should be user's id
    return (
      <div className="ui menu header-home">
        <Link
          to=""
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

          {/* <LoginModal /> */}
          <Link
            to=""
            className={`item a-header ${this.state.logStatus}`}
            onClick={this.handleLogStatus}
          >
            <ModalContainer />
          </Link>
          {/* <Link
            to=""
            className={`item a-header ${this.state.logStatus}`}
            onClick={this.handleLogStatus}
          >
            <RandomModal />
          </Link> */}

          {/* <Link
            to="/"
            className={`item a-header ${this.state.logStatus}`}
            onClick={this.handleLogStatus}
          >
            {userStatus}
          </Link> */}
          <Link
            to="/product/request"
            className={`item a-header ${this.state.shipStatus}`}
            onClick={this.handleShip}
          >
            Samples
          </Link>
          <Link
            to={`/cart/${id}`}
            className={`item a-header ${this.state.cartStatus}`}
            onClick={this.handleCart}
          >
            Cart
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

import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, fetchProducts, autoSignIn } from "../actions";
import Products from "../components/ProductDetail";
import ProductList from "../components/ProductList";
import LoginModal from "../components/LoginModal";
import WelcomeMessage from "../components/WelcomeMessage";
import { object } from "yup";

class Home extends Component {
  componentDidMount() {
    (async () => {
      const token = localStorage.getItem("userToken");
      await this.props.fetchProducts();
      if (token) {
        console.log(token);
        console.log(this.props);
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
    // const token = localStorage.getItem("userToken");

    // if (token) {
    //   console.log(token);
    //   console.log(this.props);
    //   this.props.fetchUser(token);
    //   console.log(this.props.user);
    //   //if user was successfully fetched from server, auto-sign the user.
    //   if (Object.keys(this.props.user).length === 1 && !this.props.isSignedIn) {
    //     this.props.autoSignIn(token);
    //   }
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    console.log(this.props);
    //user manually signed in, so fetch the user.
    if (
      this.props.isSignedIn &&
      !prevProps.isSignedIn &&
      Object.keys(this.props.user).length === 0
    ) {
      //const token = localStorage.getItem("userToken");
      if (this.props.token) {
        //UPDATE TOKEN SINCE LOGINMODAL IS CAUSING UPDATE WARNINGS.
        localStorage.setItem("userToken", this.props.token);
        console.log(this.props.token);
        this.props.fetchUser(this.props.token);
      }
    }
    //user manually signed off, so remove user.
  }

  render() {
    if (Object.keys(this.props.user).length !== 0) {
      console.log(this.props.user);
    }
    if (Object.keys(this.props.products).length === 0) {
      return <div></div>;
    }
    console.log(this.props);
    return (
      <div className="ui container">
        <WelcomeMessage />
        {/* <Products /> */}
        <ProductList products={this.props.products} />
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
    products: state.product,
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  fetchProducts,
  autoSignIn,
})(Home);

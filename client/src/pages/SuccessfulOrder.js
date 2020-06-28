import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemList from "../components/ItemList";
import history from "../utils/history";

class SuccessfulOrder extends Component {
  // componentDidMount() {
  //     //sign in authd user in order to get cart info.
  //     (async () => {
  //       await this.authenticateUser();
  //       if (this.props.isSignedIn && this.props.userId.length > 0) {
  //         this.props.fetchCart(this.props.userId[0]);
  //       }
  //       //add a new order when customer proceeds to checkout.
  //       //this.props.addOrder()
  //     })();
  //   }

  //   authenticateUser = async () => {
  //     // retrieve token in local storage
  //     const token = localStorage.getItem("userToken");
  //     // attempt to fetch user with valid token.
  //     if (token && this.props) {
  //       // get user info from server
  //       try {
  //         await this.props.fetchUser(token);
  //         // auto-sign in user successfully fetched from server
  //         console.log(this.props.userId);
  //         console.log(typeof this.props.userId);
  //         if (this.props.userId.length > 0 && !this.props.isSignedIn) {
  //           this.props.autoSignIn(token);
  //         }
  //       } catch (err) {
  //         console.log(err);
  //         console.log("User must manually sign in");
  //       }
  //     }
  //   };
  render() {
    if (this.props.order.items.length === 0) {
      return <div></div>;
    }
    const orderInfo = this.props.order.items;
    const userId = this.props.user;
    const {
      billingDetails,
      cardDetails,
      products,
      total,
      completedOrderAt,
    } = this.props.order.items[0];
    console.log(this.props.order.items[0]);
    //use <ItemList userId={userId} {itemInfo={orderInfo}.../>
    return (
      <div className="ui container">
        <div className="ui success huge message">
          <i className="close icon"></i>
          <div className="header">Thanks! Your payment was successful.</div>
          <p>Please view order details below.</p>
        </div>
        <ItemList userId={userId} itemInfo={products} />
        <div className="ui divider">
          <div className="ui two column grid">
            <div className="column">Name:</div>
            <div className="column">{`${billingDetails.firstName} ${billingDetails.lastName}`}</div>
            <div className="column">Address:</div>
            <div className="column">{`${billingDetails.address} ${billingDetails.address2}, ${billingDetails.city}, ${billingDetails.state}-${billingDetails.zipCode}`}</div>
            <div className="column">Payment Method:</div>
            <div className="column">{cardDetails}</div>
            <div className="column">Delivery Date:</div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order,
    user: Object.keys(state.user)[0],
  };
};

export default connect(mapStateToProps, null)(SuccessfulOrder);

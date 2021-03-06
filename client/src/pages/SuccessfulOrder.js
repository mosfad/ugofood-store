import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import ItemList from "../components/ItemList";
import history from "../utils/history";
import "../style.css";

class SuccessfulOrder extends Component {
  calculateDeliveryDate = (daysToShip = 5) => {
    const { completedOrderAt } = this.props.order.items[0];
    return moment
      .utc(completedOrderAt)
      .add(daysToShip, "d")
      .format("ddd, MMM DD, YYYY");
  };
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
    } = this.props.order.items[0];
    // console.log(this.props.order.items[0]);
    return (
      <div className="ui container">
        {/* <div className="ui success huge message">
          <i className="close icon"></i>
          <div className="header">Thanks! Your payment was successful.</div>
          <p>Please view order details below.</p>
        </div> */}
        <div className="ui segment order-message">
          <i className="clipboard check icon order"></i>
          <p className="order-header">Thanks! Your payment was successful.</p>
          <p className="order-subheader">
            Please view your order details below
          </p>
        </div>
        <br />
        <h2 className="ui header">
          <div className="content">
            <i className="clipboard list icon"></i>
            Order Summary
          </div>
        </h2>
        <div className="ui divider"></div>
        <div className="order-summary">
          <ItemList userId={userId} itemInfo={products} />
          <div className="ui divider divider-total"></div>
          <div className="ui successorder-total">
            Total({products.length} items):&nbsp;&nbsp; ${total}
          </div>
          <div className="ui divider"></div>
        </div>

        <br />
        <h2 className="ui header">
          <div className="content">
            <i className="money bill alternate icon"></i>
            Billing Details
          </div>
        </h2>
        <div className="ui divider"></div>
        <div className="billing-section">
          <div className="ui grid">
            <div
              className="three wide column category-success"
              id="name-category"
            >
              Name:
            </div>
            <div
              className="thirteen wide column value-success"
              id="name-value"
            >{`${billingDetails.firstName} ${billingDetails.lastName}`}</div>
            <div
              className="three wide column category-success"
              id="address-category"
            >
              Address:
            </div>
            <div
              className="thirteen wide column value-success"
              id="address-value"
            >{`${billingDetails.address} ${billingDetails.address2}, ${billingDetails.city}, ${billingDetails.state}-${billingDetails.zipCode}`}</div>
            <div
              className="three wide column category-success"
              id="payment-category"
            >
              Payment Method:
            </div>
            <div
              className="thirteen wide column value-success"
              id="payment-value"
            >
              {cardDetails}
            </div>
            <div
              className="three wide column category-success"
              id="delivery-category"
            >
              Delivery Date:
            </div>
            <div
              className="thirteen wide column value-success"
              id="delivery-value"
            >
              {this.calculateDeliveryDate()}
            </div>
          </div>
        </div>
        <div className="ui divider"></div>
        <br />
        <Link to="/" className="ui labeled icon button teal">
          <i className="home icon"></i>
          Back to Shopping
        </Link>
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

import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import PropTypes from "prop-types";
import history from "../utils/history";

const CheckoutForm = (props) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cardDetails, setCardDetails] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    (async () => {
      // console.log(props);
      const response = await axios.post("/api/payment_intents", {
        //calculate payment in the server. Only get cart items.
        // items: props.cartItems,
        items: props.cartItems.map((item, index) => {
          return {
            id: item.productId._id,
            name: item.productId.name,
            quantity: item.quantity,
          };
        }),
      });
      // console.log(response);
      setClientSecret(response.data.clientSecret);
    })();
  }, [props.cartItems.length]);

  useEffect(() => {
    (async () => {
      // update status of completed order.
      if (succeeded) {
        const { _id } = props.orderInfo.items[0];
        const orderData = {
          id: _id,
          status: "completed",
          completedOrderAt: Date.now(),
          cardDetails,
        };
        await props.onUpdateOrder(props.userId, orderData);
        // send success email to the shopper.

        // display successpage!
        history.push(`/successorder/${props.userId}`);
      }
    })();
  }, [succeeded]);

  const cardElementOptions = {
    style: {
      base: {
        color: "#000000",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#a79898",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(props.orderInfo);
    const {
      firstName,
      lastName,
      address,
      address2,
      city,
      state,
      country,
      zipCode,
    } = props.orderInfo.items[0].billingDetails;
    let countryCode = "";
    if (country === "United States") {
      //`United States` causes an error in stripe.
      countryCode = "US";
    }
    const billingDetails = {
      name: `${firstName} ${lastName}`,
      address: {
        city,
        country: countryCode,
        line1: address,
        line2: address2 || null,
        state,
        postal_code: zipCode,
      },
      //   email: "jane.doe@example.com",
      //   name: "Jane Doe",
      //   phone: null
    };

    // console.log(billingDetails);
    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    //create payment method
    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    });
    // console.log(paymentMethodReq);

    //confirm the card payment;`..paymentMethod.id`????
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });
    // console.log(payload);

    //
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      const { brand, last4 } = paymentMethodReq.paymentMethod.card;
      setCardDetails(`${brand.toUpperCase()}***${last4}`);
      setSucceeded(true);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardElementOptions}
        onChange={handleChange}
      />
      <button
        className="ui button fluid"
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
        </span>
      </button>
      {/*Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}

      {/*Show a success message upon completion */}
      {/* <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/paments`}>
          {""}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p> */}
    </form>
  );
};

CheckoutForm.propTypes = {
  onUpdateOrder: PropTypes.func,
  onFetchOrder: PropTypes.func,
};

export default CheckoutForm;

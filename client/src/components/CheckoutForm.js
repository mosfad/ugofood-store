import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import PropTypes from "prop-types";

const CheckoutForm = (props) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    (async () => {
      console.log(props);
      const response = await axios.post("/api/payment_intents", {
        //calculate payment in the server. Only get cart items.
        // items: props.orderItems,
        items: props.orderItems.map((item, index) => {
          return {
            id: item.productId._id,
            name: item.productId.name,
            quantity: item.quantity,
          };
        }),
      });
      console.log(response);
      setClientSecret(response.data.clientSecret);
    })();
  }, [props.orderItems.length]);

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

    const billingDetails = {
      name: e.target.name.value,
      //   email: ev.target.email.value,
      //   address: {
      //     city: ev.target.city.value,
      //     line1: ev.target.address.value,
      //     state: ev.target.state.value,
      //     postal_code: ev.target.zip.value,
    };

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    //create payment method
    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    });
    console.log(paymentMethodReq);

    //confirm the card payment;`..paymentMethod.id`????
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });
    console.log(payload);

    //
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
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
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/paments`}>
          {""}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>
    </form>
  );
};

CheckoutForm.propTypes = {
  onUpdateOrder: PropTypes.func,
};

export default CheckoutForm;

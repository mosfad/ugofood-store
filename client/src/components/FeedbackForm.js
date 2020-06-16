import React, { Component } from "react";
import { Ratings } from "semantic-ui-react";
import { connect } from "react-redux";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import reducers from "../reducers";
import { createstore } from "redux";
import history from "../utils/history";
import {} from "../actions";

class FeedbackForm extends component {
  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      isSubmitting,
      resetForm,
    } = this.props;
    //console.log(this.props);
    return (
      <form class="ui form">
        <div className="field">
          Overall Ratings: &nbsp;
          <Rating rating={ratings} maxRating={5} />
        </div>
        <div className="field">
          <label htmlFor="headline">Add a headline of review</label>
          <input
            type="text"
            name="headline"
            placeholder="What's the main thing you noticed about this product?"
            value={values.headline}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="text">Add your review</label>
          <textarea
            placeholder="Tell us what you liked and how we can improve? When are you likely to use this product?"
            style={{ minHeight: "100px" }}
            rows="3"
          ></textarea>
        </div>

        <button className="ui button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .required("Password is required"),
  }),

  mapPropsToValues: (props) => ({
    email: "",
    password: "",
  }),

  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    (async () => {
      await props.signIn(values);
      setSubmitting(false);
      resetForm({});
    })();

    //props.signIn(payload);
    // const payload = {
    //   ...values,
    // };

    // setTimeout(() => {
    //   alert(JSON.stringify(payload, null, 2));
    //   setSubmitting(false);
    // }, 000);
  },

  displayName: "FeedbackForm",
})(FeedbackForm);

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    isSignedIn: state.auth.isSignedIn,
    token: state.auth.userToken,
    modalOpen: state.modal.modalOpen,
  };
};

export default connect(mapStateToProps, { signIn, openModal, closeModal })(
  formikEnhancer
);

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
import { addProductReview } from "../actions";

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
    console.log(this.props);
    return (
      <form class="ui form" onSubmit={handleSubmit}>
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
          {touched.email && errors.headline ? (
            <div className="ui pointing red basic label">{errors.headline}</div>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="review">Add your review</label>
          <textarea
            placeholder="Tell us what you liked and how we can improve? When are you likely to use this product?"
            style={{ minHeight: "100px" }}
            rows="3"
          ></textarea>
          {touched.email && errors.review ? (
            <div className="ui pointing red basic label">{errors.review}</div>
          ) : null}
        </div>

        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    headline: Yup.string().required("Please provide a headline. Thanks!"),
    review: Yup.string().required("Please give a review. Thanks!"),
  }),

  mapPropsToValues: (props) => ({
    headline: "",
    review: "",
    ratings: 0,
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
    review: state.user.review,
  };
};

export default connect(mapStateToProps, { addProductReview })(formikEnhancer);

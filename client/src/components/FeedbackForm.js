import React, { Component } from "react";
import { Rating } from "semantic-ui-react";
import { connect } from "react-redux";
import { Button, Header, Image, Modal } from "semantic-ui-react";
//import { Link } from "react-router-dom";
import { withFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//import reducers from "../reducers";
//import { createstore } from "redux";
//import history from "../utils/history";
//addProductReview(userId, productId, formValues)
//import { addProductReview } from "../actions";
import PropTypes from "prop-types";
import "./forms.css";

class FeedbackForm extends Component {
  static propTypes = {
    onAddReview: PropTypes.func,
  };
  // componentDidUpdate(prevProps) {
  //   if (this.prevProps.review.productId !== this.props.review)
  // }

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
      handleClick,
      isSubmitting,
      resetForm,
      feedbackProductId,
      userId,
      onAddReview,
      setFieldValue,
    } = this.props;
    //console.log(this.props);
    //console.log(window.location.pathname.slice(10));
    return (
      <form className="ui form feedback" onSubmit={handleSubmit}>
        <div className="field feedback" name="rating">
          <span className="feedback-ratings-header">Overall Ratings:</span>{" "}
          &nbsp;
          <Rating
            name="rating"
            onRate={(e, { rating }) => {
              setFieldValue("rating", rating);
            }}
            rating={values.rating}
            maxRating={5}
          />
        </div>
        <div className="field feedback">
          <label htmlFor="headline">
            <h4>Add a headline of review</h4>
          </label>
          <input
            type="text"
            name="headline"
            placeholder="What's the main thing you noticed about this product?"
            value={values.headline}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.headline && errors.headline ? (
            <div className="ui pointing red basic label">{errors.headline}</div>
          ) : null}
        </div>
        <div className="field feedback">
          <label htmlFor="review">
            <h4>Add your review</h4>
          </label>
          <textarea
            name="review"
            placeholder="Tell us what you liked and how we can improve? When are you likely to use this product?"
            style={{ minHeight: "100px" }}
            rows="3"
            value={values.review}
            onBlur={handleBlur}
            onChange={handleChange}
          ></textarea>
          {touched.review && errors.review ? (
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

  mapPropsToValues: (props) => {
    console.log(props.feedbackProductId);
    return {
      //id: window.location.pathname.slice(10),
      userId: props.userId,
      productId: props.feedbackProductId,
      headline: "",
      review: "",
      rating: 0,
    };
  },
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    console.log(values.productId);
    console.log(values);
    const { headline, rating, review, userId, productId } = values;
    props.onAddReview(userId, productId, {
      headline,
      rating,
      review,
    });
    setSubmitting(false);
    resetForm();

    // setTimeout(() => {
    //   props.onAddReview(userId, productId, { headline, rating, review });
    //   setSubmitting(false);
    //   resetForm();
    // }, 2000);
    // setTimeout(() => {
    //   console.log(response);
    // }, 3000);
    // console.log(response);
    // if (response.data.productId === productId) {
    //   alert("Thanks! Your review was successfully sent.");
  },

  displayName: "FeedbackForm",
})(FeedbackForm);

export default formikEnhancer;

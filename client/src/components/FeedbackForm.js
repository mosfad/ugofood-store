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
import { addProductReview } from "../actions";
import "./forms.css";

class FeedbackForm extends Component {
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
      setFieldValue,
    } = this.props;
    console.log(this.props);
    console.log(window.location.pathname.slice(10));
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

  mapPropsToValues: (props) => ({
    id: window.location.pathname.slice(10),
    headline: "",
    review: "",
    rating: 0,
  }),

  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    props.addProductReview(props.id, values);
    setSubmitting(false);
    resetForm();
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

import React, { Component } from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./forms.css";

class ShipForm extends Component {
  handleUserInput = (e) => {
    //console.log(this.props);
    //const category = e.target.value;
    //console.log(category);
    this.props.handleChange(e);
    //console.log(category);
    //console.log(this.props.values);
    //let touchedFields = false;
    const { touched, errors, dirty, isValid } = this.props;
    // if (
    //   touched.firstName &&
    //   touched.lastName &&
    //   touched.address &&
    //   touched.state &&
    //   touched.zipCode
    // ) {
    //   touchedFields = true;
    // }

    if (isValid && dirty) {
      console.log(this.props);
    }
  };
  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      handleBlur,
      handleSubmit,
      handleReset,
      isSubmitting,
      resetForm,
    } = this.props;
    //console.log(this.props);
    return (
      <form className="ui large form" id="ship-form">
        <div className="field">
          <label>Total Cost</label>
          <Message>{this.props.total}</Message>
        </div>
        <div className="field">
          <label>Name</label>
          <div className="two fields">
            <div className="field">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={values.firstName}
                onBlur={handleBlur}
                onChange={this.handleUserInput}
              />
              {touched.firstName && errors.firstName ? (
                <div className="ui pointing red basic label">
                  {errors.firstName}
                </div>
              ) : null}
            </div>
            <div className="field">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={this.handleUserInput}
              />
              {touched.lastName && errors.lastName ? (
                <div className="ui pointing red basic label">
                  {errors.lastName}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="field">
          <label>Billing Address</label>
          <div className="fields">
            <div className="twelve wide field">
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={values.address}
                onBlur={handleBlur}
                onChange={this.handleUserInput}
              />
              {touched.address && errors.address ? (
                <div className="ui pointing red basic label">
                  {errors.address}
                </div>
              ) : null}
            </div>
            <div className="four wide field">
              <input
                type="text"
                name="address2"
                placeholder="Apt #"
                value={values.address2}
                onBlur={handleBlur}
                onChange={this.handleUserInput}
              />
            </div>
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>State</label>
            <select
              className="ui fluid dropdown"
              name="state"
              value={values.state}
              onBlur={handleBlur}
              onChange={this.handleUserInput}
            >
              <option value="">State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            {touched.state && errors.state ? (
              <div className="ui pointing red basic label">{errors.state}</div>
            ) : null}
          </div>
          <div className="field">
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={values.zipCode}
              onBlur={handleBlur}
              onChange={this.handleUserInput}
            />
            {touched.zipCode && errors.zipCode ? (
              <div className="ui pointing red basic label">
                {errors.zipCode}
              </div>
            ) : null}
          </div>
        </div>
        <div className="disabled field">
          <label>Country</label>

          <input
            placeholder="United States"
            type="text"
            disabled=""
            value="United States"
            tabIndex="-1"
          />
        </div>
      </form>
    );
  }
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    address: Yup.string().required("Address is required"),
    //address2: Yup.string().required("Address 2 is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string()
      .min(4, "Zip code is invalid")
      .required("Zip code is required"),
  }),

  mapPropsToValues: (props) => ({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    state: "",
    zipCode: "",
    country: "United States",
  }),

  handleSubmit: (values, { props, setSubmitting, resetForm }) => {},

  displayName: "ShipForm",
})(ShipForm);

const mapStateToProps = (state, ownProps) => {};

export default formikEnhancer;

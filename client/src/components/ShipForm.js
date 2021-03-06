import React, { Component } from "react";
import { Message, Button } from "semantic-ui-react";
import { withFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import "./forms.css";

class ShipForm extends Component {
  static propTypes = {
    onAddOrder: PropTypes.func,
  };

  state = {};

  // handleUserInput = (e) => {
  //   //console.log(this.props);
  //   const value = e.target.value;
  //   const name = e.target.name;
  //   //console.log(category);
  //   this.props.handleChange(e);
  //   //console.log(category);
  //   //console.log(this.props.values);
  //   //let touchedFields = false;
  //   //this.props.setFieldValue(e.target.name, e.target.value);
  //   if (name === "zipCode") {
  //     console.log(value);
  //   }

  //   const { touched, errors, dirty, isValid } = this.props;
  //   // if (
  //   //   touched.firstName &&
  //   //   touched.lastName &&
  //   //   touched.address &&
  //   //   touched.state &&
  //   //   touched.zipCode
  //   // ) {
  //   //   touchedFields = true;
  //   // }
  //   setTimeout(() => {
  //     if (isValid && dirty) {
  //       console.log(this.props);
  //       const { values, userId, onAddOrder } = this.props;
  //       console.log(values);
  //       const orderData = this.buildOrderForm(values);
  //       console.log(userId);
  //       console.log(orderData);
  //       onAddOrder(userId, orderData);
  //     }
  //   }, 1000);
  //   // if (isValid && dirty) {
  //   //console.log(this.props);
  //   //setTimeout(() => console.log(this.props), 2000);
  //   // add new order when customer enters details(don't include card info)
  //   //const orderData = {};
  //   //this.props.onAddOrder(this.props.userId, orderData);
  //   // }
  // };

  handleOnclick = (e) => {
    //prevents default behavior of submitting form...
    e.preventDefault();
    //confirm billing details
    this.setState((prevState) => ({ active: !prevState.active }));
    const { values, userId, onAddOrder } = this.props;
    // console.log(values);
    const orderData = this.buildOrderForm(values);
    // console.log(userId);
    // console.log(orderData);
    onAddOrder(userId, orderData);
  };

  handleReset = async (e) => {
    e.preventDefault();
    const {
      values,
      resetForm,
      onDeleteOrder,
      userId,
      orderInfo: { items },
    } = this.props;
    //const { _id } = items[0];
    const orderId = items[0]._id;
    this.setState({ active: false });
    await onDeleteOrder(userId, orderId);
    setTimeout(() => resetForm({ values: "" }), 1500);
  };
  buildOrderForm = (billingDetails) => {
    const { cartItems, total } = this.props;
    const orderData = {
      status: "in progress",
      billingDetails,
      products: cartItems.map((product) => {
        return {
          name: product.productId.name,
          description: product.productId.description,
          url: product.productId.url,
          quantity: product.quantity,
          price: product.productId.price,
        };
      }),
      total,
    };
    return orderData;
  };

  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      handleBlur,
      handleSubmit,
      handleChange,
      handleReset,
      isSubmitting,
      resetForm,
    } = this.props;
    //console.log(this.props);
    const { active } = this.state;
    return (
      <form className="ui large form" id="ship-form">
        <div className="field">
          <label>Total Cost</label>
          <Message>{`$${this.props.total}`}</Message>
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
                // onChange={this.handleUserInput}
                onChange={handleChange}
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
                onChange={handleChange}
                // onChange={this.handleUserInput}
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
                onChange={handleChange}
                // onChange={this.handleUserInput}
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
                onChange={handleChange}
                // onChange={this.handleUserInput}
              />
            </div>
          </div>
        </div>
        <div className="field">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="City Adress"
            value={values.city}
            onBlur={handleBlur}
            onChange={handleChange}
            // onChange={this.handleUserInput}
          />
          {touched.city && errors.city ? (
            <div className="ui pointing red basic label">{errors.city}</div>
          ) : null}
        </div>
        <div className="two fields">
          <div className="field">
            <label>State</label>
            <select
              className="ui fluid dropdown"
              name="state"
              value={values.state}
              onBlur={handleBlur}
              onChange={handleChange}
              // onChange={this.handleUserInput}
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
              onChange={handleChange}
              // onChange={this.handleUserInput}
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
            readOnly
            placeholder="United States"
            type="text"
            disabled=""
            value="United States"
            tabIndex="-1"
          />
        </div>
        <Button toggle active={active} onClick={this.handleOnclick}>
          Confirm Address &nbsp; {active ? <i className="check icon"></i> : ""}
        </Button>
        <Button color="red" onClick={this.handleReset}>
          Reset Form
        </Button>
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
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string()
      .min(4, "Zip code is invalid") //`min = 4` was chosen to address async issues in `handleUserInput`
      .required("Zip code is required"),
  }),

  mapPropsToValues: (props) => ({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  }),

  //handleSubmit: (values, { props, setSubmitting, resetForm }) => {},

  // handleSubmit: (values, { props, setSubmitting, resetForm }) => {
  //   props.addProductReview(props.id, values);
  //   setSubmitting(false);
  //   resetForm();
  // },

  displayName: "ShipForm",
})(ShipForm);

const mapStateToProps = (state, ownProps) => {};

export default formikEnhancer;

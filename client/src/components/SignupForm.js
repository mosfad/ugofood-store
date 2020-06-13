import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../utils/API";
import "./forms.css";
class SignupForm extends Component {
  render() {
    return (
      <div classname="form-container">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values);
            await register(values);
            setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("First name is required"),
            lastName: Yup.string()
              .max(20, "Must be characters or less")
              .required("Last name is required"),
            email: Yup.string()
              .email("Email is invalid")
              .required("Email is required"),
            password: Yup.string()
              .min(8, "Password must contain at least 8 characters")
              .required("Password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Confirm Password is required"),
            address: Yup.string().required("Required"),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            //console.log(props);
            return (
              <form className="ui large form" onSubmit={handleSubmit}>
                <div className="two fields">
                  <div className="field">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      type="text"
                      value={values.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.firstName && errors.firstName ? (
                      <div className="ui pointing red basic label">
                        {errors.firstName}
                      </div>
                    ) : null}
                  </div>
                  <div className="field">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      type="text"
                      value={values.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.lastName && errors.lastName ? (
                      <div className="ui pointing red basic label">
                        {errors.lastName}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    placeholder="email"
                    type="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.email && errors.email ? (
                    <div className="ui pointing red basic label">
                      {errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="field">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.password && errors.password ? (
                    <div className="ui pointing red basic label">
                      {errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="field">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <div className="ui pointing red basic label">
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
                <div className="field">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.address && errors.address ? (
                    <div className="ui pointing red basic label">
                      {errors.address}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="ui submit button"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="ui primary button"
                  id="reset-btn"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button>
              </form>
            );
          }}
        </Formik>

        <br />
        <div className="warn-message">
          <i className="icon help"></i>
          Already signed up? <a href="#">Login here</a> instead.
        </div>
      </div>
    );
  }
}

export default SignupForm;

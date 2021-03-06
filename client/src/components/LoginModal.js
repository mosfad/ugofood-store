import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import "./modal.css";
import "../style.css";

class LoginModal extends Component {
  static propTypes = {
    onSignin: PropTypes.func,
  };

  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

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
      //    openModal,
      //   closeModal,
      //   modalOpen,
    } = this.props;
    //console.log(this.props);
    return (
      <Modal
        trigger={
          <div
            id="modal-btn-text"
            className="ui center aligned"
            onClick={this.handleOpen}
          >
            Login
          </div>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>User Login</Modal.Header>
        <Modal.Content>
          <form className="ui form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
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
                type="password"
                name="password"
                placeholder="Password"
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
            <button
              className="ui button"
              type="submit"
              onClick={handleSubmit}
              //open={this.modalOpen} //watch this attribute very closely w.r.t mounting errors***
            >
              Submit
            </button>
          </form>
        </Modal.Content>
        <Modal.Actions>
          <div className="warn-message sigup-link">
            <i className="icon help"></i>
            Don't have an account? &nbsp;
            <Link to="/signup" onClick={this.handleClose}>
              Sign up
            </Link>
          </div>
        </Modal.Actions>
      </Modal>
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
    props.onSignin(values);
    setSubmitting(false);
    resetForm();
  },

  displayName: "LoginModal",
})(LoginModal);

export default formikEnhancer;

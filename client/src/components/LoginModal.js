import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import reducers from "../reducers";
import { createstore } from "redux";
import history from "../utils/history";

import { signIn, openModal, closeModal } from "../actions";

//import { signIn } from "../utils/API";
import "./modal.css";
import "../style.css";

class ModalContainer extends Component {
  //not sure if componentDidUpdate is causing app to auto sign in???
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentDidUpdate(prevProps, prevState) {
    //WHERE DO I SET THE LOCALSTORAGE FOR AUTHORIZATION BEARER??????
    if (this._isMounted) {
      console.log(`I am in update lifecycle ${prevProps.token}`);
      console.log(`I am in update lifecycle ${this.props.token}`);
      if (this.props.modalOpen && this.props.token !== prevProps.token) {
        console.log("Token from server is " + this.props.token);
        localStorage.setItem("userToken", this.props.token);
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
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
      openModal,
      closeModal,
      modalOpen,
    } = this.props;
    //console.log(this.props);
    return (
      <Modal
        trigger={
          <Link
            to="/"
            id="modal-btn-text"
            className="ui center aligned"
            onClick={openModal} //function
          >
            Login
          </Link>
        }
        open={modalOpen} //boolean
        onClose={closeModal} //boolean: closes modal when clicked?
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
              open={modalOpen}
            >
              Submit
            </button>
          </form>
        </Modal.Content>
        <Modal.Actions>
          <div className="warn-message sigup-link">
            <i className="icon help"></i>
            Don't have an account? &nbsp;
            <Link to="/signup" onClick={closeModal} open={modalOpen}>
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
    (async () => {
      await props.signIn(values);
      setSubmitting(false);
      resetForm({});
      props.closeModal();
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

  displayName: "ModalContainer",
})(ModalContainer);

const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  return {
    isSignedIn: state.auth.isSignedIn,
    token: state.auth.userToken,
    modalOpen: state.modal.modalOpen,
  };
};

export default connect(mapStateToProps, { signIn, openModal, closeModal })(
  formikEnhancer
);

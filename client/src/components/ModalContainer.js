import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { signIn, openModal, closeModal } from "../actions";

//import { signIn } from "../utils/API";
import "./modal.css";
import "../style.css";

class ModalContainer extends Component {
  // state = { modalOpen: false };

  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await signIn({
  //     email: "tholmes@example.com",
  //     password: "#dev!678*",
  //   });
  //   console.log(response.data);
  //   this.handleClose();
  // };

  // handleClose = () => this.setState({ modalOpen: false });

  // handleOpen = () => this.setState({ modalOpen: true });

  // render() {
  //   return (
  //     <Modal
  //       trigger={
  //         <Link
  //           to=""
  //           id="modal-btn-text"
  //           className="ui center aligned"
  //           // onClick={this.handleOpen}
  //         >
  //           Login
  //         </Link>
  //       }
  //       // open={this.state.modalOpen}
  //       // onClose={this.handleClose}
  //     >
  //       <Modal.Header>User Login</Modal.Header>
  //       <Modal.Content>
  //         <Formik
  //           initialValues={{
  //             email: "",
  //             password: "",
  //           }}
  //           onSubmit={async (values, { setSubmitting }) => {
  //             console.log(values);
  //             await this.props.signIn(values);
  //             //console.log(response.data);
  //             //setSubmitting(false);
  //             if (this.props.isSignedIn) {
  //               alert(
  //                 `Welcome ${values.email}, you have successfully signed in`
  //               );
  //               this.props.closeModal();
  //             }

  //             //how do I close the modal here and send a success message?!
  //             //todo: Let redux handle closing and opening the modal.
  //           }}
  //           validationSchema={Yup.object().shape({
  //             email: Yup.string()
  //               .email("Email is invalid")
  //               .required("Email is required"),
  //             password: Yup.string()
  //               .min(8, "Password must contain at least 8 characters")
  //               .required("Password is required"),
  //           })}
  //         >
  //           {(props) => {
  //             const {
  //               values,
  //               touched,
  //               errors,
  //               dirty,
  //               isSubmitting,
  //               handleChange,
  //               handleBlur,
  //               handleSubmit,
  //               handleReset,
  //             } = props;
  //             //console.log(props);
  //             return (
  //               <form className="ui form" onSubmit={handleSubmit}>
  //                 <div className="field">
  //                   <label htmlFor="email">Email</label>
  //                   <input
  //                     type="email"
  //                     name="email"
  //                     placeholder="Email"
  //                     value={values.email}
  //                     onBlur={handleBlur}
  //                     onChange={handleChange}
  //                   />
  //                   {touched.email && errors.email ? (
  //                     <div className="ui pointing red basic label">
  //                       {errors.email}
  //                     </div>
  //                   ) : null}
  //                 </div>
  //                 <div className="field">
  //                   <label htmlFor="password">Password</label>
  //                   <input
  //                     type="password"
  //                     name="password"
  //                     placeholder="Password"
  //                     value={values.password}
  //                     onBlur={handleBlur}
  //                     onChange={handleChange}
  //                   />
  //                   {touched.password && errors.password ? (
  //                     <div className="ui pointing red basic label">
  //                       {errors.password}
  //                     </div>
  //                   ) : null}
  //                 </div>
  //                 <button className="ui button" type="submit">
  //                   Submit
  //                 </button>
  //               </form>
  //             );
  //           }}
  //         </Formik>
  //       </Modal.Content>
  //       <Modal.Actions></Modal.Actions>
  //     </Modal>
  //   );
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
      isSubmitting,
      openModal,
      closeModal,
      modalOpen,
    } = this.props;
    console.log(this.props);
    return (
      <Modal
        trigger={
          <Link
            to=""
            id="modal-btn-text"
            className="ui center aligned"
            onClick={openModal} //function
          >
            Login
          </Link>
        }
        open={modalOpen} //boolean
        // onClose={this.handleClose}
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
        <Modal.Actions></Modal.Actions>
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

  handleSubmit: (values, { props, setSubmitting }) => {
    const submit = async () => {
      const isAuthd = await props.signIn(values);
      setSubmitting(false);
      props.closeModal();
    };
    submit();
    //props.signIn(payload);
    // const payload = {
    //   ...values,
    // };

    // setTimeout(() => {
    //   alert(JSON.stringify(payload, null, 2));
    //   setSubmitting(false);
    // }, 1000);
  },

  displayName: "ModalContainer",
})(ModalContainer);

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    isSignedIn: state.auth.isSignedIn,
    token: state.auth.token,
    modalOpen: state.modal.modalOpen,
  };
};

export default connect(mapStateToProps, { signIn, openModal, closeModal })(
  formikEnhancer
);

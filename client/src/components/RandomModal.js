import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Header, Image, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
//import { withFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { signIn, openModal, closeModal } from "../actions";

//import { signIn } from "../utils/API";
import "./modal.css";
import "../style.css";

class RandomModal extends Component {
  state = { email: "", password: "", modalOpen: false };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${this.state.email} just logged in.`);
    this.handleClose();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };
  render() {
    return (
      <Modal
        as={Form}
        onSubmit={this.handleSubmit}
        trigger={
          <Link
            to=""
            id="modal-btn-text"
            className="ui center aligned"
            onClick={this.handleOpen}
          >
            Login
          </Link>
        }
        open={this.state.modalOpen}
        //onClose={this.handleClose}
      >
        <Header as="h2">User Login</Header>
        <Modal.Content>
          <Form.Input
            label="email"
            required
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Form.Input
            label="password"
            required
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default RandomModal;

// class RandomModal extends Component {
//     state = { email: "", password: "", modalOpen: false };

//     handleSubmit = (e) => {
//       e.preventDefault();
//       console.log(`${this.state.email} just logged in.`);
//     };

//     handleChange = (event) => {
//       const { name, value } = event.target;
//       this.setState({ [name]: value });
//     };

//     handleClose = () => {
//       this.setState({ modalOpen: false });
//     };

//     handleOpen = () => {
//       this.setState({ modalOpen: true });
//     };
//     render() {
//       return (
//         <Modal
//           as="form"
//           className="ui form"
//           onSubmit={this.handleSubmit}
//           trigger={
//             <Link
//               to=""
//               id="modal-btn-text"
//               className="ui center aligned"
//               //onClick={this.handleOpen}
//             >
//               Login
//             </Link>
//           }
//           // open={this.state.modalOpen}
//           // onClose={this.handleClose}
//         >
//           <Modal.Header>User Login</Modal.Header>
//           <Modal.Content>
//             <div className="field">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={this.state.email}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="field">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={this.state.password}
//                 onChange={this.handleChange}
//               />
//             </div>
//           </Modal.Content>
//           <Modal.Actions>
//             <button
//               className="ui submit button"
//               type="submit"
//               // onClick={this.handleClose}
//             >
//               Submit
//             </button>
//           </Modal.Actions>
//         </Modal>
//       );
//     }
//   }

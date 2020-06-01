import React, { Component } from "react";
import { Link } from "react-router-dom";

class AltSignupForm extends Component {
  state = { firstName: "", lastName: "", email: "", address: "" };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form className="ui form " onSubmit={this.handleSubmit}>
          <div className="two fields">
            <div className="field">
              <label>First Name</label>
              <input
                name="firstName"
                placeholder="First Name"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input
                name="lastName"
                placeholder="Last Name"
                type="text"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              name="email"
              placeholder="email"
              type="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>Address</label>
            <input name="address" type="text" onChange={this.handleChange} />
          </div>
          <div className="inline field">
            {/* <div className="ui checkbox">
      <input type="checkbox" id="terms"/>
      <label for="terms">I agree to the terms and conditions</label>
    </div> */}
          </div>
          <div className="ui fluid submit button">Submit</div>
        </form>
        <br />
        <div className="warn-message">
          <i className="icon help"></i>
          Already signed up? <a href="#">Login here</a> instead.
        </div>
      </div>
    );
  }
}

export default AltSignupForm;

import React, { Component } from "react";

class SignupForm extends Component {
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
      <div className="ui inverted segment">
        <form className="ui inverted form" onSubmit={this.handleSubmit}>
          <div className="two fields">
            <div className="field">
              <label>First Name</label>
              <input
                placeholder="First Name"
                name="firstName"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                name="lastName"
                type="text"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="address"
              onChange={this.handleChange}
            />
          </div>
          {/* <div className="inline field">
                  <div className="ui checkbox">
                    <input type="checkbox" tabindex="0" className="hidden" />
                    <label>I agree to the terms and conditions</label>
                  </div>
                </div> */}
          <div className="ui submit button">Submit</div>
        </form>
      </div>
    );
  }
}

export default SignupForm;

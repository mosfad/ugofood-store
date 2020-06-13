import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Button, Header, Image, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";

class LoginModal extends Component {
  render() {
    return ReactDOM.createPortal(
      <div className="ui basic modal" onClick={(e) => e.stopPropagation()}>
        <div className="ui icon header">
          <i className="archive icon"></i>
          Archive Old Messages
        </div>
        <div className="content">
          <p>
            Your inbox is getting full, would you like us to enable automatic
            archiving of old messages?
          </p>
        </div>
        <div className="actions">
          <div className="ui red basic cancel inverted button">
            <i className="remove icon"></i>
            No
          </div>
          <div className="ui green ok inverted button">
            <i className="checkmark icon"></i>
            Yes
          </div>
        </div>
      </div>,
      document.querySelector("#modal-login")
    );
  }
}

export default LoginModal;

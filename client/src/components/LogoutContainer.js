import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut, unfetchUser } from "../actions";

class LogoutContainer extends Component {
  // This life cycle is unnecessary because it will automatically
  // sign user out!!!
  //   componentDidMount() {
  //     console.log("what's going on with logout????");
  //      this.props.signOut();
  //   }
  handleClick = () => {
    (async () => {
      await this.props.signOut();
      this.props.unfetchUser();
    })();
  };

  render() {
    return <div onClick={this.handleClick}>Logout</div>;
  }
}

// const mapStateToProps = (state) => {
//     return state
// }

export default connect(null, { signOut, unfetchUser })(LogoutContainer);

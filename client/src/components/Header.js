import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut, signIn, fetchUser, openModal, closeModal } from "../actions";
import LoginModal from "./LoginModal";
import LogoutContainer from "./LogoutContainer";
import history from "../utils/history";

class Header extends Component {
  state = { activeItem: "home", setModal: false };

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevProps)
  //   console.log(this.props)
  //   console.log(prevState)
  //   console.log(this.state)
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("I am in header update cycle");
  //   if (
  //     window.location.pathname === "/" &&
  //     this.state.activeItem === "signup"
  //   ) {
  //     this.setState({ activeItem: "home" });
  //   }
  // }

  handleItemClick = (e, { name }) =>
    this.setState(
      {
        activeItem: name,
      },
      () => {
        if (
          this.state.activeItem === "signup" &&
          window.location.pathname === "/"
        ) {
          console.log("I am in the unwanted sigup condition");
          this.setState({ activeItem: "home" });
          // console.log("Login button was clicked!!!");
          // this.setState({ setModal: true }, () => {
          //   console.log(`setModal is now ${this.state.setModal}`);
          //});
        }
      }
    );

  onSignin = async (userData) => {
    await this.props.signIn(userData);
    // store item in local storage.
    if (this.props.token) {
      localStorage.setItem("userToken", this.props.token);
      // fetch user with token
      const token = localStorage.getItem("userToken");
      await this.props.fetchUser(token);
      const { user, userId } = this.props;
      // alert signedin user.
      alert(`Welcome ${user[userId].firstName}!`);
      // navigate to the home page.
      history.push("/");
    }
  };

  render() {
    const { activeItem } = this.state;
    const { isSignedIn } = this.props;
    let id = this.props.userId || 1;
    // console.log(window.location.pathname);

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeItem === "home" && window.location.pathname === "/"}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            {isSignedIn && (
              <Menu.Item
                as={Link}
                to="/"
                name="logout"
                active={activeItem === "logout"}
                onClick={this.handleItemClick}
              >
                <LogoutContainer />
              </Menu.Item>
            )}

            {!isSignedIn && (
              <Menu.Item
                name="login"
                active={
                  activeItem === "login" && window.location.pathname === "/"
                }
                onClick={this.handleItemClick}
              >
                <LoginModal onSignin={this.onSignin} />
              </Menu.Item>
            )}
            <Menu.Item
              as={Link}
              to="/signup"
              name="signup"
              active={
                activeItem === "signup" ||
                window.location.pathname === "/signup"
              }
              onClick={this.handleItemClick}
            />
            {/* <Menu.Item
              as={Link}
              to="/ordersample/3"
              name="ordersample"
              active={activeItem === "ordersample"}
              onClick={this.handleItemClick}
            >
              Order Sample
            </Menu.Item> */}
            <Menu.Item
              as={Link}
              to={`/cart/${id}`}
              name="cart"
              active={activeItem === "cart"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //console.log(ownProps);
  return {
    isSignedIn: state.auth.isSignedIn,
    token: state.auth.userToken,
    modalOpen: state.modal.modalOpen,
    userId: Object.keys(state.user)[0],
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  signOut,
  signIn,
  fetchUser,
  openModal,
  closeModal,
})(Header);

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { signOut } from "../actions";
// import ModalContainer from "./ModalContainer";

// import "../style.css";

// class Header extends Component {
//   state = { activeItem: "home" };

//   handleItemClick = (e) => {
//     const { name } = e.target;
//     console.log(name);
//     this.setState({ activeItem: name });
//   };

//   render() {
//     const { activeItem } = this.state;
//     let userStatus = "Login";
//     let id = 1; //should be user's id
//     return (
//       <div className="ui menu header-home">
//         <Link
//           to=""
//           name="home"
//           active={activeItem === "home"}
//           className="item a-header"
//           onClick={this.handleItemClick}
//         >
//           Home
//         </Link>
//         <div className="right menu">
//           <Link
//             to="/signup"
//             name="signup"
//             active={activeItem === "signup"}
//             className="item a-header"
//             onClick={this.handleItemClick}
//           >
//             Signup
//           </Link>

//           {/* <LoginModal /> */}
//           <Link
//             to=""
//             name="login"
//             className="item a-header"
//             onClick={this.handleItemClick}
//           >
//             <ModalContainer />
//           </Link>
//           {/* <Link
//             to=""
//             className={`item a-header ${this.state.logStatus}`}
//             onClick={this.handleLogStatus}
//           >
//             <RandomModal />
//           </Link> */}

//           {/* <Link
//             to="/"
//             className={`item a-header ${this.state.logStatus}`}
//             onClick={this.handleLogStatus}
//           >
//             {userStatus}
//           </Link> */}
//           <Link
//             to="/product/request"
//             name="productrequest"
//             active={activeItem === "productrequest"}
//             className="item a-header"
//             onClick={this.handleItemClick}
//           >
//             Samples
//           </Link>
//           <Link
//             to={`/cart/${id}`}
//             name="cart"
//             active={activeItem === "cart"}
//             className="item a-header"
//             onClick={this.handleItemClick}
//           >
//             Cart
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     isSignedIn: state.auth.isSignedIn,
//   };
// };

// export default connect(mapStateToProps, { signOut })(Header);

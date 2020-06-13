import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../actions";
import ModalContainer from "./ModalContainer";
import LogoutContainer from "./LogoutContainer";

class Header extends Component {
  state = { activeItem: "home", setModal: false };

  handleItemClick = (e, { name }) =>
    this.setState(
      {
        activeItem: name,
      },
      () => {
        if (this.state.activeItem === "login") {
          //??HOW TO MAKE login respond to parent
          console.log("Login button was clicked!!!");
          this.setState({ setModal: true }, () => {
            console.log(`setModal is now ${this.state.setModal}`);
          });
        }
      }
    );

  // renderLoginModal = () => <ModalContainer />;

  render() {
    const { activeItem } = this.state;
    let id = this.props.userId || 1;

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/"
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
            >
              <LogoutContainer />
            </Menu.Item>

            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={this.handleItemClick}
            >
              <ModalContainer />
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/signup"
              name="signup"
              active={activeItem === "signup"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={Link}
              to="/ordersample"
              name="ordersample"
              active={activeItem === "ordersample"}
              onClick={this.handleItemClick}
            >
              Order Sample
            </Menu.Item>
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

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: Object.keys(state.user)[0],
  };
};

export default connect(mapStateToProps, {
  signOut,
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

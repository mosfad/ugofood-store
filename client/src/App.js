import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import Header from "./components/Header";
import CheckoutOrder from "./pages/CheckoutOrder";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import Feedback from "./pages/Feedback";
import SuccessfulOrder from "./pages/SuccessfulOrder";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signup" exact component={Signup} />
              <Route
                path="/checkoutorder/:id"
                exact
                component={CheckoutOrder}
              />
              <Route
                path="/successorder/:id"
                exact
                component={SuccessfulOrder}
              />
              <Route path="/cart/:id" exact component={ShoppingCart} />
              <Route path="/feedback/:productid" exact component={Feedback} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

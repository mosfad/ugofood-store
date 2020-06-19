import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import Header from "./components/Header";
import ProductRequest from "./pages/ProducRequest";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import Feedback from "./pages/Feedback";

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
              <Route path="/ordersample/:id" exact component={ProductRequest} />
              <Route path="/cart/:id" exact component={ShoppingCart} />
              <Route path="/feedback/:productid" exact component={Feedback} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import PropTypes from "prop-types";
import Notifications from "react-notify-toast";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import User from "./components/User";
import Admin from "./components/Admin";
import AuthRoute from "./components/common/Auth";
import AdminRoute from "./components/common/Admin";
import GuestRoute from "./components/common/Guest";
import AdminMenu from "./components/AdminMenu";
import UsersOrders from "./components/UsersOrders";
import AdminOrders from "./components/AdminOrders";
import NotFound from "./components/NotFound";
import AppProvider from "./appContext";

class App extends Component {
  render = () => {
    return (
      <AppProvider>
        <Navbar />
        <div className="container-fluid">
          <Notifications />
          <Switch>
            <Route path="/" exact component={Home} />
            <GuestRoute
              location={this.props.location}
              path="/signup"
              exact
              component={SignUp}
            />
            <GuestRoute
              location={this.props.location}
              path="/login"
              exact
              component={Login}
            />
            <AuthRoute
              location={this.props.location}
              path="/user"
              exact
              component={User}
            />
            <AdminRoute
              location={this.props.location}
              path="/admin"
              exact
              component={Admin}
            />
            <AdminRoute
              location={this.props.location}
              path="/adminmenu"
              exact
              component={AdminMenu}
            />
            <AuthRoute
              location={this.props.location}
              path="/usersorders"
              exact
              component={UsersOrders}
            />
            <AdminRoute
              location={this.props.location}
              path="/adminorders"
              exact
              component={AdminOrders}
            />
            <Route exact component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </AppProvider>
    );
  };
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;

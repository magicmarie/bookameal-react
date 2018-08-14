import React from "react";
import Notifications from "react-notify-toast";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import User from "./components/User";
import Admin from "./components/Admin";
import AuthRoute from "./components/common/Auth";
import AdminMenu from "./components/AdminMenu";
import UsersOrders from "./components/UsersOrders";

const App = ({ location }) => (
  <BrowserRouter>
    <div>
      <Navbar />
      <div className="container-fluid">
        <Notifications />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <AuthRoute path="/user" exact component={User} />
          <AuthRoute path="/admin" exact component={Admin} />
          <AuthRoute path="/adminmenu" exact component={AdminMenu} />
          <AuthRoute path="/usersorders" exact component={UsersOrders} />
        </Switch>
      </div>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;

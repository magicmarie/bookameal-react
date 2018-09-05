import React from "react";
import Notifications from "react-notify-toast";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import AuthRoute from "./components/common/Auth";
import AdminRoute from "./components/common/Admin";
import GuestRoute from "./components/common/Guest";
import AdminMenu from "./components/Admin/AdminMenu";
import UsersOrders from "./components/User/UsersOrders";
import AdminOrders from "./components/Admin/AdminOrders";
import NotFound from "./components/common/NotFound";
import AppProvider from "./appContext";

const App = () => (
  // allows Consumers to subscribe to context changes
  <AppProvider>
    <Navbar />
    <div className="container-fluid">
      <Notifications />
      <Switch>
        <Route path="/" exact component={Home} />
        <GuestRoute path="/signup" exact component={SignUp} />
        <GuestRoute path="/login" exact component={Login} />
        <AuthRoute path="/user" exact component={User} />
        <AdminRoute path="/admin" exact component={Admin} />
        <AdminRoute path="/adminmenu" exact component={AdminMenu} />
        <AuthRoute path="/usersorders" exact component={UsersOrders} />
        <AdminRoute path="/adminorders" exact component={AdminOrders} />
        <Route exact component={NotFound} />
      </Switch>
    </div>
    <Footer />
  </AppProvider>
);

export default App;

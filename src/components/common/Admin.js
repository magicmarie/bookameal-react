// adminRoute: to protect admin routes
import React from "react";
import { Redirect, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AdminRoute = ({ component: Component, ...rest }) => {
  //check the localStorage for the token: if missing, redirect to login.
  // if exists, decode the token and check for is_admin value = True.
  // if True, load the component, else redirect to user
  const token = localStorage.getItem("token");

  return (
    <Route
      // other props being passed down to the route as well
      {...rest}
      render={props => {
        return token === null ? (
          <Redirect to="/login" />
        ) : jwtDecode(token).is_admin === "True" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/user" />
        );
      }}
    />
  );
};

export default AdminRoute;

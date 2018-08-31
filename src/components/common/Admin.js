import React from "react";
import { Redirect, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AdminRoute = ({ component: Component, ...rest }) => {
  //check the localStorage for the token: if missing, redirect to login.
  //otherwise load the component
  const token = localStorage.getItem("token");

  return (
    <Route
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

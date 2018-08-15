import React from "react";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  //check the localStorage for the token: if missing, redirect to login.
  //otherwise load the component
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={props => {
        return token === null ? <Redirect to="/login" /> : <Component />;
      }}
    />
  );
};

export default AuthRoute;

// GuestRoute: to protect guest routes: login and signup
import React from "react";
import { Redirect, Route } from "react-router-dom";

const GuestRoute = ({ component: Component, ...rest }) => {
  // check the localStorage for the token: if missing, show component(login, signup)
  // otherwise redirect to the user's page
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={props => {
        return token ? <Redirect to="/user" /> : <Component {...props} />;
      }}
    />
  );
};

export default GuestRoute;

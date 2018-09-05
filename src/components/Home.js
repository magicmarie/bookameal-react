import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div
    className="row justify-content-md-center"
    id="landing-page"
    data-gr-c-s-loaded="true"
  >
    <div className="col-md-8 text-center">
      <h1>Book-A-Meal</h1>

      <p className="description ">
        An application that allows customers to make food orders and helps the
        food vendor know what the customers want to eat. You can create a
        customer account or a caterer account. You are welcome!
      </p>
      <div className="">
        <Link className="btn button button-main" href="/signup" to="/signup">
          Signup
        </Link>
        <Link className="btn button button-secondary" href="/login" to="/login">
          Login
        </Link>
      </div>
    </div>
  </div>
);

export default Home;

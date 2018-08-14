import React from "react";
import axios from "axios";
import { notify } from "react-notify-toast";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  handleLogin = event => {
    event.preventDefault();
    const { email, password } = this.state;
    axios
      .post("/api/v1/auth/login ", { email, password })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        const decoded = jwtDecode(response.data.token);
        if (decoded.is_admin === "True") {
          notify.show(response.data.message, "success", 4000);
          this.props.history.push("/admin");
        } else {
          notify.show(response.data.message, "success", 4000);
          this.props.history.push("/user");
        }
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.message);
          notify.show(err.response.data.message, "error", 4000);
        } else if (err.request) {
          notify.show("Network error", "error", 4000);
        }
      });
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    const { email, password } = this.state;
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <div className="jumbotron">
            <form onSubmit={this.handleLogin}>
              <h2 className="text-center form-signin-heading">
                Log in to your account
              </h2>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={this.onChange}
                  name="email"
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={this.onChange}
                  name="password"
                  required
                  className="form-control"
                />
              </div>
              <div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </div>
              <p />
              <p className="text-center">
                Don't have an account yet?
                <Link to="/signup"> Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

import React from "react";
import { notify } from "react-notify-toast";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { AppContext } from "../../appContext";
import axiosInstance from "../common/Apicalls";

/**
 *@param {Event} event
 * @class Login
 * @extends {React.Component}
 */
export class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  // login
  handleLogin = event => {
    event.preventDefault();
    const { email, password } = this.state;
    axiosInstance
      .post("/auth/login", { email, password })
      .then(response => {
        // save token to localstorage, decode to get is_admin value
        localStorage.setItem("token", response.data.token);
        this.props.context.login(response.data.token);
        const decoded = jwtDecode(response.data.token);
        // admin/caterer
        notify.show(response.data.message, "success", 2000);
        const redirectUrl = decoded.is_admin === "True" ? "/admin" : "/user";
        this.props.history.push(redirectUrl);
      })
      .catch(error => {
        if (error.response) {
          notify.show(error.response.data.message, "error", 2500);
        }
      });
  };

  /**
   * @returns {any} rendered items
   * @memberof Login
   */
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
                Do not have an account yet?
                <Link href="/signup" to="/signup">
                  {" "}
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <AppContext.Consumer>
    {context => <Login {...props} context={context} ref={ref} />}
  </AppContext.Consumer>
));

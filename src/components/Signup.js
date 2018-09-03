import React from "react";
import { notify } from "react-notify-toast";
import { Link } from "react-router-dom";
import axiosInstance from "./common/Apicalls";

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    is_admin: false,
    errors: {}
  };
  // sign up
  handleSignup = event => {
    event.preventDefault();
    const { name, email, password, is_admin, errors } = this.state;
    axiosInstance
      .post("/auth/signup", { name, email, password, is_admin, errors })
      .then(response => {
        notify.show(response.data.message, "success", 2500);
        this.props.history.push("/login");
      })
      .catch(err => {
        if (err.response) {
          notify.show(err.response.data.message, "error", 2500);
        } else if (err.request) {
          notify.show("Network error", "error", 2500);
        }
      });
  };

  onChange = event => {
    // if name is is_admin, do this
    if (event.target.name === "is_admin") {
      this.setState({
        is_admin: event.target.checked
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  render() {
    const { email, name, password, is_admin } = this.state;
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <div className="jumbotron">
            <form onSubmit={this.handleSignup}>
              <h3 className=" text-center form-signin-heading">
                New user, Create an account
              </h3>
              <div className="form-group ">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={this.onChange}
                  name="name"
                  required
                  className="form-control"
                />
              </div>
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
              <div className=" form-group">
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
              <div className="form-check form-group">
                <input
                  type="checkbox"
                  name="is_admin"
                  checked={is_admin}
                  onChange={this.onChange}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="isadmin">
                  Caterer
                </label>
                <p className="danger">For caterer only</p>
              </div>
              <div>
                <button type="submit" className="btn btn-primary btn-block">
                  Signup
                </button>
              </div>
              <p />
              <p className="text-center">
                Already have an account?
                <Link to="/login"> Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;

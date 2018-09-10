import React from "react";
import { notify } from "react-notify-toast";
import { Link } from "react-router-dom";
import axiosInstance from "../common/Apicalls";
import { Form } from "../common/Helper";

/**
 *@param {Event} event
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    is_admin: false,
    errors: {}
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
        }
      });
  };

  /**
   * @returns {any} rendered items
   * @memberof Signup
   */
  render() {
    const { email, name, password, is_admin } = this.state;
    const formFields = [
      {
        type: "text",
        name: "name",
        value: name,
        label: "Name"
      },
      {
        type: "email",
        name: "email",
        value: email,
        label: "Email"
      },
      {
        type: "password",
        name: "password",
        value: password,
        label: "Password"
      }
    ];
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <div className="jumbotron">
            <form onSubmit={this.handleSignup}>
              <h3 className=" text-center form-signin-heading">
                New user, Create an account
              </h3>
              <Form formFields={formFields} onChange={this.onChange} />
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
                <Link href="/login" to="/login">
                  {" "}
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;

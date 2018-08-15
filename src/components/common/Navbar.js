import React from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

class Navbar extends React.Component {
  state = {
    isAdmin: false,
    isLoggedIn: false
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      this.setState({ isLoggedIn: true });
      const decoded = jwtDecode(token);
      if (decoded.is_admin === "True") {
        this.setState({ isAdmin: true });
      }
    }
  };
  //logged in as a caterer/admin
  // adminLogIn = () => (
  //   <ul className="navbar-nav">
  //     <li className="nav-item active">
  //       <Link className="nav-link" to="/">
  //         Username
  //       </Link>
  //     </li>
  //     <li className="nav-item active">
  //       <Link className="nav-link" to="/">
  //         Meals
  //       </Link>
  //     </li>
  //     <li className="nav-item active">
  //       <Link className="nav-link" to="/">
  //         Menu
  //       </Link>
  //     </li>
  //     <li className="nav-item active">
  //       <Link className="nav-link" to="/">
  //         Orders
  //       </Link>
  //     </li>
  //   </ul>
  // );

  // logged in as a customer
  // userLogIn = () => (
  //   <ul className="navbar-nav">
  //     <li className="nav-item active">
  //       <Link className="nav-link" to="/">
  //         Username
  //       </Link>
  //     </li>
  //     <li className="nav-item active">
  //       <Link className="nav-link" to="/">
  //         Notifications
  //       </Link>
  //     </li>
  //     <li className="nav-item active">
  //       <Link className="nav-link" to="/">
  //         Order History
  //       </Link>
  //     </li>
  //
  //   </ul>
  // );

  render() {
    const { isLoggedIn } = this.state;

    return (
      <nav className="navbar navbar-expand-lg navbar-light topnav">
        <a className="navbar-brand" href="/">
          Book A Meal
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav float-left">
            {isLoggedIn ? (
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Log Out
                </Link>
              </li>
            ) : (
              <li className="nav-item active">
                <Link className="nav-link" to="/login">
                  Log In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;

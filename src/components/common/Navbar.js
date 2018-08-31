import React from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../appContext";

class Navbar extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => {
          return (
            <nav className="navbar navbar-expand-lg navbar-light topnav">
              <a className="navbar-brand">Book A Meal</a>
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
                {context.isAdmin && (
                  <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/admin"
                      >
                        Meals
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/adminmenu"
                      >
                        Menu
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/adminorders"
                      >
                        Orders
                      </NavLink>
                    </li>
                  </ul>
                )}
                {context.isUser && (
                  <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/user"
                      >
                        Menus
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/usersorders"
                      >
                        Order History
                      </NavLink>
                    </li>
                  </ul>
                )}
                {context.isLoggedIn ? (
                  <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                      <div className="nav-link" to="#">
                        <i className="fa fa-user fa-fw" aria-hidden="true" />
                        {context.email}
                      </div>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="#logout"
                        onClick={() => context.logout()}
                      >
                        Log Out
                      </NavLink>
                    </li>
                  </ul>
                ) : (
                  <ul className="nav navbar-nav">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/login"
                      >
                        Log In
                      </NavLink>
                    </li>
                  </ul>
                )}
              </div>
            </nav>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default Navbar;

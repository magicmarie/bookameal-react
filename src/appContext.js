// app provider component: react context API
import React, { Component } from "react";
import jwtDecode from "jwt-decode";

// 
export const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    isAdmin: false,
    isLoggedIn: false,
    isUser: false,
    email: "",
    logout: () => {}
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      isAdmin: false,
      isLoggedIn: false,
      isUser: false,
      email: ""
    });
  };

  login = token => {
    this.handleToken(token);
  };

  handleToken = token => {
    if (token !== null) {
      this.setState({ isLoggedIn: true });
      const decoded = jwtDecode(token);
      if (decoded.is_admin === "True") {
        this.setState({ isAdmin: true, email: decoded.email });
      } else if (decoded.is_admin === "False") {
        this.setState({ isUser: true, email: decoded.email });
      }
    }
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    this.handleToken(token);
    this.setState({ logout: this.logout, login: this.login });
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;

// app provider component: react context API
import React, { Component } from "react";
import jwtDecode from "jwt-decode";

export const AppContext = React.createContext();

/**
 *@param {token} token
 *@param {any} item
 * @param {number} quantity
 * @class AppProvider
 * @extends {Component}
 */
class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      isLoggedIn: false,
      isUser: false,
      email: "",
      logout: this.logout,
      login: this.login,
      setCart: this.setCart,
      clearCart: this.clearCart,
      getCart: this.getCart,
      cartItems: []
    };
  }

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    this.handleToken(token);
    this.setState({
      logout: this.logout,
      login: this.login,
      setCart: this.setCart,
      clearCart: this.clearCart,
      getCart: this.getCart,
      setQuantity: this.setQuantity,
      deleteFromCart: this.deleteFromCart
    });
  };

  setCart = item => {
    let cart;
    item = { ...item, quantity: 1 };
    const jsonCart = sessionStorage.getItem("cart");
    if (jsonCart === null) {
      cart = [];
      cart.push(item);
    } else {
      cart = JSON.parse(jsonCart);
      cart.push(item);
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  getCart = () => {
    const cart = sessionStorage.getItem("cart");
    if (cart === null) {
      return [];
    }
    return JSON.parse(cart);
  };

  setQuantity = (mealId, quantity) => {
    const cart = this.getCart();
    const newCart = cart.map(item => {
      if (item.meal_id === mealId) {
        item.quantity = quantity;
      }
      return item;
    });
    sessionStorage.setItem("cart", JSON.stringify(newCart));
    window.location.reload();
  };
  // delete item form cart
  deleteFromCart = mealId => {
    const cart = this.getCart();
    const newCart = cart.filter(item => item.meal_id !== mealId);
    sessionStorage.setItem("cart", JSON.stringify(newCart));
    window.location.reload();
  };

  clearCart = () => sessionStorage.removeItem("cart");

  login = token => {
    this.handleToken(token);
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

  /**
   * @returns {any} appcontext
   * @memberof AppProvider
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;

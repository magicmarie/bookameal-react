import React from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import axiosInstance from "../common/Apicalls";
import CartItem from "./CartItem";

/**
 * @class UserCart
 * @extends {React.Component}
 */
class UserCart extends React.Component {
  state = {
    loaded: false,
    cartItems: []
  };

  /**
   *
   *@returns {cartitems} cartitems
   * @memberof UserCart
   */
  componentDidMount() {
    console.log(this.props, "mqf");
    this.getCartItems();
  }

  // get cart items
  getCartItems = () => {
    const { cartItems } = this.state;
    console.log(cartItems);
    this.setState({
      items: cartItems,
      loaded: true
    });
  };

  // post order from menu: user
  handleAddOrder = (id, meal_id) => {
    axiosInstance
      .post(`/orders/${id}/${meal_id}`)
      .then(response => {
        notify.show(response.data.message, "success", 2500);
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 404) {
            this.setState({
              orders: []
            });
          }
        } else if (error.request) {
          notify.show("Wrong request", "error", 2500);
        }
      });
  };

  /**
   *
   *
   * @returns {any} rendered items
   * @memberof UserCart
   */
  render() {
    const { cartItems, loaded } = this.state;
    const orders =
      cartItems.length === 0 ? (
        <div>No orders added to cart yet</div>
      ) : (
        cartItems.map(order => (
          <CartItem
            id={order.menu_id}
            orderId={order.id}
            mealName={order.name}
            price={order.price}
            adminName={order.userName}
            key={order.id}
            handleAddOrder={this.handleAddOrder}
          />
        ))
      );
    return (
      <div>
        <h4 className="header text-center">My Cart </h4>
        <table className="table table-bordered table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col">Meal</th>
              <th scope="col">Price(UGX)</th>
              <th scope="col">Quantity</th>
              <th scope="col">Caterer</th>
              <th scope="col">Sub Total(UGX)</th>
              <th scope="col">Approve</th>
              <th scope="col">Cancel</th>
            </tr>
          </thead>
          <Loader loaded={loaded}>
            <div>{orders}</div>
          </Loader>
        </table>
      </div>
    );
  }
}

export default UserCart;

import React from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import axiosInstance from "../common/Apicalls";
import CartItem from "./CartItem";
import { contextWrapper } from "../common/Helper";

/**
 * @class UserCart
 * @extends {React.Component}
 */
export class UserCart extends React.Component {
  state = {
    loaded: true
  };

  /**
   *
   *@returns {cartitems} cartitems
   * @memberof UserCart
   */

  onChange = (evt, mealId) => {
    const quantity = evt.target.value;
    this.props.context.setQuantity(mealId, quantity);
  };

  makeOrder = () => {
    const items = this.props.context.getCart();
    axiosInstance.post("/orders", { meals: items }).then(res => {
      // Redirect to  orders
      notify.show("Order made successfully", "success", 2500);
      this.props.context.clearCart();
      this.props.history.push("/usersorders");
    });
  };

  /**
   * @returns {any} rendered items
   * @memberof UserCart
   */
  render() {
    const { loaded } = this.state;
    const cartItems = this.props.context.getCart();
    const orders =
      cartItems.length === 0 ? (
        <tr>
          <div>No orders added to cart yet</div>
        </tr>
      ) : (
        cartItems.map((order, index) => (
          <CartItem
            key={index}
            id={order.meal_id}
            quantity={order.quantity}
            menuId={order.menu_id}
            mealName={order.meal_name}
            price={order.price}
            adminName={order.adminName}
            onChange={this.onChange}
            removeItem={this.props.context.deleteFromCart}
          />
        ))
      );
    return (
      <div>
        <h4 className="header text-center">My Cart </h4>
        <Loader loaded={loaded}>
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">Caterer</th>
                <th scope="col">Meal</th>
                <th scope="col">Quantity</th>
                <th>Unit Price(UGX)</th>
                <th scope="col">Sub Total(UGX)</th>
                <th scope="col">Cancel</th>
              </tr>
            </thead>
            <tbody>{orders}</tbody>
          </table>
          <button
            disabled={cartItems.length === 0}
            className="btn btn-primary"
            onClick={this.makeOrder}
          >
            Make orders
          </button>
        </Loader>
      </div>
    );
  }
}

export default contextWrapper(UserCart);

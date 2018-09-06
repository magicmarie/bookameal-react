import React from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import axiosInstance from "../common/Apicalls";
import { AppContext } from "../../appContext";
import CartItem from "./CartItem";

/**
 * @class UserCart
 * @extends {React.Component}
 */
class UserCart extends React.Component {
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

  // post order from menu: user
  handleAddOrder = (id, meal_id, quantity) => {
    axiosInstance
      .post(`/orders/${id}/${meal_id}/${quantity}`)
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

  makeOrder = () => {
    const items = this.props.context.getCart();
    axiosInstance.post("/orders", { meals: items }).then(res => {
      // Redirect to  orders
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
            handleAddOrder={this.handleAddOrder}
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

export default React.forwardRef((props, ref) => (
  <AppContext.Consumer>
    {context => <UserCart {...props} context={context} ref={ref} />}
  </AppContext.Consumer>
));

import React, { Component } from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import axiosInstance from "./common/Apicalls";

const Order = props => (
  <div className="menu-item">
    <div className="row">
      <div className="col-md-4">{props.mealName}</div>
      <div className="price col-md-2">{props.price}</div>
      <div className="col-md-3">{props.customerName}</div>
      <div className="col-sm-3 text-center">
        <select>
          <option value="Delivered">Delivered</option>
          <option value="Not delivered">Not delivered</option>
          <option value="In progress">In progress</option>
        </select>
      </div>
    </div>
  </div>
);

class AdminDashboard extends Component {
  state = {
    orders: [],
    loaded: false
  };
  //get all orders from admin's meals
  getUserOrders = () => {
    axiosInstance
      .get("/orders")
      .then(response => {
        const orders = response.data.order_items.orders;
        this.setState({ orders, loaded: true });
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 404) {
            this.setState({
              orders: []
            });
          } else if (status === 401) {
            localStorage.removeItem("token");
          }
        } else if (error.request) {
          notify.show("Wrong request", "warning", 2500);
        }
      });
  };

  // always called before the component's first render
  // fetches the orders list
  componentWillMount() {
    this.getUserOrders();
  }
  render() {
    const { orders, loaded } = this.state;

    const ordersDetails =
      orders.length === 0 ? (
        <div>No orders Found</div>
      ) : (
        orders.map(order => (
          <div key={order.id}>
            <Order
              id={order.id}
              mealName={order.meal_name}
              price={order.price}
              customerName={order.customerName}
            />
          </div>
        ))
      );

    return (
      <div className="container-fluid">
        <h2 className="header text-center">Orders</h2>
        <Loader loaded={loaded}>
          <div>{ordersDetails}</div>
        </Loader>
      </div>
    );
  }
}
export default AdminDashboard;

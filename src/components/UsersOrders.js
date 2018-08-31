import React, { Component } from "react";
import Loader from "react-loader";
import { Link } from "react-router-dom";
import { notify } from "react-notify-toast";
import axiosInstance from "./common/Apicalls";
import Delete from "./DeleteOrder";

//order: customer side
const Order = props => (
  <div className="card mb-2 meal" style={{ width: "12rem", height: "10rem" }}>
    <div className="card-body text-center">
      <div className="card-text">{props.mealName}</div>
      <div className="card-text">{props.price}</div>
      <div className="card-text">
        Caterer:
        {props.adminName}
      </div>
      <hr />
      <Link
        to="#"
        className="fa fa-trash icon mealcard"
        data-toggle="modal"
        aria-hidden="true"
        title="delete order"
        data-target={`#deleteOrderModal${props.id}`}
      />
    </div>
    <Delete
      id={props.id}
      meal_name={props.mealName}
      ConfirmDeleteOrder={props.ConfirmDeleteOrder}
    />
  </div>
);

class UserOrders extends Component {
  state = {
    orders: [],
    loaded: false
  };

  //delete order: close modal, show success message, get the menu
  ConfirmDeleteOrder = order_id => {
    axiosInstance.delete(`/orders/${order_id}`).then(response => {
      notify.show(response.data.message, "success", 2500);
      document.getElementById(`cancelModal${order_id}`).click();
      this.getUserOrders();
    });
  };
  //get user orders
  getUserOrders = () => {
    axiosInstance
      .get("/user/orders")
      .then(response => {
        const orders = response.data.Orders.orders;
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
  componentDidMount() {
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
              adminName={order.adminName}
              ConfirmDeleteOrder={this.ConfirmDeleteOrder}
            />
          </div>
        ))
      );

    return (
      <Loader loaded={loaded}>
        <h2 className="header text-center">Orders</h2>
        <div className="row">{ordersDetails}</div>
      </Loader>
    );
  }
}
export default UserOrders;

import React, { Component } from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import axiosInstance from "../common/Apicalls";
import Pagination from "../common/Pagination";

// order: customer side
const Order = props => (
  <div className="card mb-2 meal">
    <div className="card-body">
      <div className="card-text">
        <strong>Caterer: </strong>
        {props.adminName}
      </div>
      <div className="card-text">
        <strong>Meal name: </strong>
        {props.mealName}
      </div>
      <div className="card-text">
        <strong>Price: </strong>
        {props.price}
        UGX
      </div>
      <div className="card-text">
        <strong>Quantity: </strong>
        {props.quantity}
      </div>
    </div>
  </div>
);

/**
 * @class UserOrders
 * @extends {Component}
 */
class UserOrders extends Component {
  state = {
    orders: [],
    loaded: false,
    nextPage: null,
    previousPage: null,
    currentPage: null,
    pages: null
  };

  /**
   *@returns {orders} orders
   * @memberof UserOrders
   */
  componentDidMount() {
    this.getUserOrders();
  }

  // get user orders
  getUserOrders = () => {
    const page = this.state.currentPage || 1;

    axiosInstance
      .get("/user/orders", { params: { page } })
      .then(response => {
        const {
          currentPage,
          orders,
          nextPage,
          pages,
          previousPage
        } = response.data.Orders;
        this.setState({
          currentPage,
          orders,
          nextPage,
          pages,
          previousPage,
          loaded: true
        });
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            localStorage.removeItem("token");
          }
        } else if (error.request) {
          notify.show("Wrong request", "warning", 2500);
        }
      });
  };

  // pagination
  changePage = selectedPage => {
    this.setState(
      {
        currentPage: selectedPage
      },
      () => this.getUserOrders()
    );
  };

  /**
   *
   *
   * @returns {any} rendered items
   * @memberof UserOrders
   */
  render() {
    const {
      orders,
      loaded,
      currentPage,
      pages,
      nextPage,
      previousPage
    } = this.state;
    const ordersDetails =
      orders.length === 0 ? (
        <div>No orders Found</div>
      ) : (
        orders.map(order => (
          <div className="col-md-3 col-lg-3" key={order.id}>
            <Order
              id={order.id}
              mealName={order.meal_name}
              price={order.price}
              quantity={order.quantity}
              adminName={order.adminName}
              ConfirmDeleteOrder={this.ConfirmDeleteOrder}
            />
          </div>
        ))
      );

    return (
      <div>
        <Loader loaded={loaded}>
          <h2 className="header text-center">Orders</h2>
          <div className="row">{ordersDetails}</div>
        </Loader>
        <Pagination
          currentPage={currentPage}
          previousPage={previousPage}
          nextPage={nextPage}
          pages={pages}
          changePage={this.changePage}
        />
      </div>
    );
  }
}
export default UserOrders;

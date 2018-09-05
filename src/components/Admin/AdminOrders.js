import React, { Component } from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import axiosInstance from "../common/Apicalls";
import Pagination from "../common/Pagination";

const Order = props => (
  <div className="menu-item">
    <div className="row">
      <div className="col-md-4">{props.mealName}</div>
      <div className="price col-md-2">{props.price}</div>
      <div className="col-md-3 text-center">{props.customerName}</div>
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
    total: null,
    orders: [],
    loaded: false,
    nextPage: null,
    previousPage: null,
    currentPage: null,
    pages: null,
    totalCount: null
  };
  //get all orders from admin's meals
  getUserOrders = () => {
    const page = this.state.currentPage || 1;
    axiosInstance
      .get("/orders", { params: { page } })
      .then(response => {
        const {
          total,
          currentPage,
          orders,
          nextPage,
          pages,
          perPage,
          previousPage,
          totalCount
        } = response.data.order_items;
        this.setState({
          total,
          currentPage,
          orders,
          nextPage,
          pages,
          perPage,
          previousPage,
          totalCount,
          loaded: true
        });
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
  //pagination
  changePage = selectedPage => {
    this.setState(
      {
        currentPage: selectedPage
      },
      () => this.getUserOrders()
    );
  };

  // always called before the component's first render
  // fetches the orders list
  componentWillMount() {
    this.getUserOrders();
  }
  render() {
    const {
      total,
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
        <div className="card mb-2" style={{ width: "10rem" }}>
          <div className="card-body">
            <h5 className="card-title">Total amount</h5>
            <p className="card-text">
              {total}
              UGX
            </p>
          </div>
        </div>
        <Loader loaded={loaded}>
          <div>{ordersDetails}</div>
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
export default AdminDashboard;

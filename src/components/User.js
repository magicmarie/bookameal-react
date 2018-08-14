import React, { Component } from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import { Link } from "react-router-dom";
import axiosInstance from "./common/Apicalls";

const Menu = props => (
  <div className=" row menu-item">
    <div className="number">{props.id}</div>
    <p>{props.mealName}</p>
    <div className="price">{props.price}</div>
    <Link
      to="#"
      className="add"
      onClick={() => props.handleAddOrder(props.id, props.mealId)}
    >
      +
    </Link>
  </div>
);

class UserDashboard extends Component {
  state = {
    menus: [],
    loaded: false
  };
  //get menu
  getMenus = () => {
    axiosInstance
      .get("/menu")
      .then(response => {
        const menus = response.data.Menu;
        this.setState({ menus, loaded: true });
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 404) {
            this.setState({
              menus: []
            });
          }
        } else if (error.request) {
          notify.show("Wrong request", "warning", 4000);
        }
      });
  };
  //get user orders
  // getOrders = () => {
  //   axiosInstance
  //     .get("/user/orders")
  //     .then(response => {
  //       const orders = response.data;
  //       this.setState({ orders, loaded: true });
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         const { status } = error.response;
  //         if (status === 404) {
  //           this.setState({
  //             orders: []
  //           });
  //         }
  //       } else if (error.request) {
  //         notify.show("Wrong request", "warning", 4000);
  //       }
  //     });
  //};
  //post order from menu: user
  handleAddOrder = (id, meal_id, meal_name, price) => {
    axiosInstance
      .post(`/orders/${id}/${meal_id}`)
      .then(response => {
        const orders = response.data;
        this.setState({ orders });
        notify.show(response.data.message, "success", 4000);
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
          notify.show("Wrong request", "error", 4000);
        }
      });
  };
  componentWillMount() {
    this.getMenus();
  }

  render() {
    let daysList = [
      { dataDay: "monday", value: "Monday" },
      { dataDay: "tuesday", value: "Tuesday" },
      { dataDay: "wednesday", value: "Wednesday" },
      { dataDay: "thursday", value: "Thursday" },
      { dataDay: "friday", value: "Friday" },
      { dataDay: "saturday", value: "Saturday" },
      { dataDay: "sunday", value: "Sunday" }
    ];
    let days = daysList.map((day, i) => (
      <li key={i} className="list-group-item">
        <button className="btn btn-block btn-lg" data-day={day.dataDay}>
          {day.value}
        </button>
      </li>
    ));
    const { menus, loaded } = this.state;
    const menuItems =
      menus.length === 0 ? (
        <div>No Menu Found</div>
      ) : (
        menus.map(menu => (
          <Menu
            id={menu.id}
            mealId={menu.meal_id}
            mealName={menu.meal_name}
            price={menu.price}
            key={menu.id}
            handleAddOrder={this.handleAddOrder}
          />
        ))
      );
    // const { orders } = this.state;
    // const orderItems =
    //   orders.length === 0 ? (
    //     <div>No Orders Found</div>
    //   ) : (
    //     orders.map(order => (
    //       <Menu
    //         id={order.id}
    //         mealId={order.meal_id}
    //         mealName={order.meal_name}
    //         price={order.price}
    //         key={order.id}
    //       />
    //     ))
    //   );
    return (
      <div className="row">
        <div className="col-md-2">
          <div className="header">Menus</div>
          <ul className="list-group">{days}</ul>
        </div>
        <div className="col-md-5">
          <div className="menu">
            <h4 className="header text-center">Daily Menu</h4>
            <Loader loaded={loaded}>{menuItems}</Loader>
          </div>
        </div>
        <div className="col-md-5">
          <div className="ordered">
            <div className="header text-center">Order</div>
            <Loader loaded={loaded}>
              {/* <div className="row">{orderItems}</div> */}
            </Loader>
          </div>
        </div>
      </div>
    );
  }
}
export default UserDashboard;

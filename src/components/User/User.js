import React, { Component } from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import axiosInstance from "../common/Apicalls";
import WeekDays from "../common/WeekDays";
import UserMenuItem from "./UserMenuItem";

class UserDashboard extends Component {
  state = {
    menus: [],
    loaded: false,
    today: "",
    order_items: []
  };
  //get menu: customer side
  getMenus = menu_day => {
    axiosInstance
      .get(`/user-menus/${menu_day}`)
      .then(response => {
        this.setState({
          menus: response.data.menus,
          loaded: true,
          today: menu_day.charAt(0).toUpperCase() + menu_day.slice(1)
        });
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 404) {
            this.setState({
              menus: []
            });
          } else if (status === 401) {
            localStorage.removeItem("token");
          }
        } else if (error.request) {
          notify.show("Wrong request", "warning", 2500);
        }
      });
  };

  //post order from menu: user
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
  handleAddCart = (meal_id, meal_name, price, adminName) => {
    // console.log(mealId, mealName, price, adminName);
    const { order_items } = this.state;
    const orderItem = {
      meal_id,
      meal_name,
      price,
      adminName
    };
    order_items.push(orderItem);
    console.log(order_items);
  };
  componentDidMount() {
    const today = this.getCurrentDay();
    this.getMenus(today);
    this.setState({ today });
  }

  getCurrentDay = () => {
    const numberDay = new Date().getDay();
    const days = [
      { key: 1, name: "Monday" },
      { key: 2, name: "Tuesday" },
      { key: 3, name: "Wednesday" },
      { key: 4, name: "Thursday" },
      { key: 5, name: "Friday" },
      { key: 6, name: "Saturday" },
      { key: 7, name: "Sunday" }
    ];
    const today = days.find(day => day.key === numberDay);
    return today.name;
  };

  getMenu = day => {
    day = day.charAt(0).toUpperCase() + day.slice(1);
    const { menus } = this.state;
    this.setState({ currentDay: day, menus });
  };
  render() {
    const { loaded, menus, today, order_items } = this.state;
    // const orderItems =
    // order_items.length === 0 ?(
    //   <div>No orders made yet</div>
    // ): (
    //   order_items.map(item, index) =>(
    //     <div></div>
    //   )

    // )
    const menuItems =
      menus.length === 0 ? (
        <div>No Menu Found</div>
      ) : (
        menus.map((menu, index) => (
          <div className="menu" key={index}>
            <p className="text-center">
              <strong>
                Caterer {" : "}
                {menu.userName}
              </strong>
            </p>
            {menu.meals.map(meal => (
              <UserMenuItem
                id={meal.menu_id}
                mealId={meal.id}
                mealName={meal.name}
                price={meal.price}
                adminName={menu.userName}
                key={meal.id}
                handleAddCart={this.handleAddCart}
                // handleAddOrder={this.handleAddOrder}
              />
            ))}
          </div>
        ))
      );

    return (
      <div className="row">
        <div className="col-md-2">
          <div className="header text-center">Day</div>

          <ul className="list-group">
            <WeekDays getMenu={this.getMenus} />
          </ul>
        </div>
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-6">
              <h4 className="header text-center">
                {today}
                's Menus
              </h4>
              <Loader loaded={loaded}>
                <div>{menuItems}</div>
              </Loader>
            </div>
            <div className="col-md-6">
              <h4 className="header text-center">Orders</h4>
              <ul className="">
                <li className="">
                  <div className="row">
                    <div className="col-sm-2">1</div>
                    <div className="col-sm-4">name</div>
                    <div className="col-sm-2">qty</div>
                    <div className="col-sm-2">10000</div>
                    <div className="col-sm-2">10000</div>
                  </div>
                </li>
                <hr />
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserDashboard;

import React, { Component } from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import { Link } from "react-router-dom";
import axiosInstance from "./common/Apicalls";
import WeekDays from "./WeekDays";

// menu card: customer side
const Menu = props => (
  <div className="menu-item">
    <div className="row">
      <div className="col-md-6">{props.mealName}</div>
      <div className="price col-md-2">{props.price}</div>
      <Link
        to="#"
        className="add col-md-4 text-center"
        title="make an order"
        onClick={() => props.handleAddOrder(props.id, props.mealId)}
      >
        +
      </Link>
    </div>
  </div>
);

class UserDashboard extends Component {
  state = {
    menus: [],
    loaded: false,
    today: ""
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
        console.log(response.data);
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
    const { loaded, menus, today } = this.state;
    const menuItems =
      menus.length === 0 ? (
        <div>No Menu Found</div>
      ) : (
        menus.map((menu, index) => (
          <div key={index}>
            <div className="row">
              <h5>
                <strong>{menu.userName}</strong>
              </h5>
            </div>
            {menu.meals.map(meal => (
              <Menu
                id={meal.menu_id}
                mealId={meal.id}
                mealName={meal.name}
                price={meal.price}
                key={meal.id}
                handleAddOrder={this.handleAddOrder}
              />
            ))}
          </div>
        ))
      );

    return (
      <div className="row">
        <div className="col-md-2">
          <div className="header text-center">Days</div>

          <ul className="list-group">
            <WeekDays getMenu={this.getMenus} />
          </ul>
        </div>
        <div className="vl" />
        <div className="col-md-9">
          <h4 className="header text-center">
            {today}
            's Menus
          </h4>
          <Loader loaded={loaded}>
            <div className="h4">{menus.userName}</div>
            <div>{menuItems}</div>
          </Loader>
        </div>
      </div>
    );
  }
}
export default UserDashboard;

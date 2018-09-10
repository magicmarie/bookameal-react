import React, { Component } from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import axiosInstance from "../common/Apicalls";
import UserMenuItem from "./UserMenuItem";
import getCurrentDay from "../common/CurrentDay";
import { HelpDiv, contextWrapper } from "../common/Helper";

/**
 * @class UserDashboard
 * @extends {Component}
 */
export class UserDashboard extends Component {
  state = {
    menus: [],
    loaded: false,
    today: ""
  };

  /**
   *@returns {menus} menus
   * @memberof UserDashboard
   */
  componentDidMount() {
    const today = getCurrentDay();
    this.getMenus(today);
    this.setState({ today });
  }

  // get menu: customer side
  /**
   *@returns {null} null
   *@param {string} menu_day
   * @memberof UserDashboard
   */
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
          if (status === 401) {
            localStorage.removeItem("token");
          }
        } else if (error.request) {
          notify.show("Wrong request", "warning", 2500);
        }
      });
  };

  /**
   *
   *@param {string} day
   *@returns {null} null
   * @memberof UserDashboard
   */
  getMenu = day => {
    day = day.charAt(0).toUpperCase() + day.slice(1);
    const { menus } = this.state;
    this.setState({ currentDay: day, menus });
  };

  /**
   *@param meal_id
   *@param meal_name
   *@param adminName
   *@param id
   *@returns {null} null
   * @memberof UserDashboard
   */
  handleAddCart = (meal_id, meal_name, price, adminName, id) => {
    const cartItem = {
      menu_id: id,
      meal_id,
      meal_name,
      price,
      adminName
    };
    this.props.context.setCart(cartItem);
    notify.show("Added to your Cart", "success", 2000);
  };

  /**
   *
   *
   * @returns {any} rendered items
   * @memberof UserDashboard
   */
  render() {
    const { loaded, menus, today } = this.state;
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
              />
            ))}
          </div>
        ))
      );

    return (
      <div className="row">
        <HelpDiv getMenu={this.getMenu} />
        <div className="col-md-10">
          <h4 className="header text-center">
            {today}
            's Menus
          </h4>
          <Loader loaded={loaded}>
            <div>{menuItems}</div>
          </Loader>
        </div>
      </div>
    );
  }
}
export default contextWrapper(UserDashboard);

import React, { Component } from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import axiosInstance from "../common/Apicalls";
import Menu from "./Menu";
import WeekDays from "../common/WeekDays";
import getCurrentDay from "../common/CurrentDay";

/**
 *
 *@param {string} day
 * @class AdminMenu
 * @extends {Component}
 */
class AdminMenu extends Component {
  state = {
    menus: [],
    loaded: false,
    currentMenu: {
      meals: [],
      name: ""
    }
  };

  /**
   *@returns {menus} menus
   * @memberof AdminMenu
   */
  componentDidMount() {
    this.getMenus();
  }

  // get menu: admin side
  /**
   *@returns {null} null
   * @memberof AdminMenu
   */
  getMenus = () => {
    axiosInstance
      .get("/admin-menus")
      .then(response => {
        const today = getCurrentDay();
        const currentMenu = response.data.menus.find(
          menu => today === menu.name
        );
        this.setState({
          menus: response.data.menus,
          loaded: true,
          currentMenu
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

  getMenu = day => {
    day = day.charAt(0).toUpperCase() + day.slice(1);
    // manipulate the menus array from the state to get currentMenu
    const { menus } = this.state;
    const currentMenu = menus.find(menu => day === menu.name);
    this.setState({ currentDay: day, currentMenu });
  };
  // delete meal from the menu: close modal, show success message, get the menu
  ConfirmDeleteMeal = id => {
    axiosInstance.delete(`/menu/${id}`).then(response => {
      notify.show(response.data.message, "success", 2500);
      document.getElementById(`cancelModal${id}`).click();
      this.getMenus();
    });
  };

  /**
   * @returns {any} rendered items
   * @memberof AdminMenu
   */
  render() {
    const { currentMenu, loaded } = this.state;
    const menuDetails =
      currentMenu.meals.length === 0 ? (
        <div>No Menu Found</div>
      ) : (
        currentMenu.meals.map(menu => (
          <div className="col-md-3 col-lg-3" key={menu.id}>
            <Menu
              id={menu.id}
              mealName={menu.meal_name}
              price={menu.price}
              key={menu.id}
              ConfirmDeleteMeal={this.ConfirmDeleteMeal}
            />
          </div>
        ))
      );
    return (
      <div className="row">
        <div className="col-md-2">
          <div className="header">Days</div>
          <ul className="list-group">
            <WeekDays getMenu={this.getMenu} />
          </ul>
        </div>
        <div className="vl" />
        <div className="col-md-9 meal-list">
          <h2 className="header text-center">
            {currentMenu.name}
            's Menu List
          </h2>
          <Loader loaded={loaded}>
            <div className="row">{menuDetails}</div>
          </Loader>
        </div>
      </div>
    );
  }
}
export default AdminMenu;

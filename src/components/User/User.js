import React, { Component } from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import axiosInstance from "../common/Apicalls";
import WeekDays from "../common/WeekDays";
import UserMenuItem from "./UserMenuItem";
import getCurrentDay from "../common/CurrentDay";
import { AppContext } from "../../appContext";

/**
 * @class UserDashboard
 * @extends {Component}
 */
class UserDashboard extends Component {
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

  getMenu = day => {
    day = day.charAt(0).toUpperCase() + day.slice(1);
    const { menus } = this.state;
    this.setState({ currentDay: day, menus });
  };

  handleAddCart = (meal_id, meal_name, price, adminName, id) => {
    console.log(meal_id, adminName);
    const cartItem = {
      id,
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
    console.log(menus);
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
        <div className="col-md-2">
          <div className="header text-center">Day</div>

          <ul className="list-group">
            <WeekDays getMenu={this.getMenus} />
          </ul>
        </div>
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
export default React.forwardRef((props, ref) => (
  <AppContext.Consumer>
    {context => <UserDashboard {...props} context={context} ref={ref} />}
  </AppContext.Consumer>
));

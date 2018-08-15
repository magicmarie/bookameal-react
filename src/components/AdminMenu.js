import React, { Component } from "react";
import Loader from "react-loader";
import axiosInstance from "./common/Apicalls";
import { notify } from "react-notify-toast";
import Menu from "./Menu";

class AdminMenu extends Component {
  state = {
    menu: [],
    loaded: false
  };
  // get the menu
  getMenu = () => {
    axiosInstance
      .get("/menu")
      .then(response => {
        const menu = response.data.Menu;
        this.setState({ menu, loaded: true });
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 404) {
            this.setState({
              menu: []
            });
          } else if (status === 401) {
            localStorage.removeItem("token");
          }
        } else if (error.request) {
          notify.show("Wrong request", "warning", 4000);
        }
      });
  };
  // make an order from the menu
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
    this.getMenu();
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

    const { menu, loaded } = this.state;
    const menuDetails =
      menu.length === 0 ? (
        <div>No Menu Found</div>
      ) : (
        menu.map(menumeal => (
          <div key={menumeal.id}>
            <Menu
              id={menumeal.id}
              mealName={menumeal.meal_name}
              price={menumeal.price}
              key={menumeal.id}
              handleAddOrder={this.handleAddOrder}
            />
          </div>
        ))
      );

    return (
      <div className="row">
        <div className="col-md-2">
          <div className="header">Days</div>
          <ul className="list-group">{days}</ul>
        </div>
        <div className="col-md-6 meal-list">
          <h2 className="header text-center">Menu List</h2>
          <Loader loaded={loaded}>
            <div className="row">{menuDetails}</div>
          </Loader>
        </div>
        <div className="col-md-4">
          <div className="ordered">
            <div className="header text-center">Order</div>
            {/* <Loader loaded={loaded}>
              <div className="row">{Orders}</div>
            </Loader> */}
          </div>
        </div>
      </div>
    );
  }
}
export default AdminMenu;

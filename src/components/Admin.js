import React, { Component } from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import axiosInstance from "./common/Apicalls";
import Meal from "./Meal";
import Add from "./Add";

class AdminDashboard extends Component {
  state = {
    meals: [],
    loaded: false
  };
  //get all meals created by admin
  getMeals = () => {
    axiosInstance
      .get("/meals")
      .then(response => {
        const meals = response.data.meal_items;
        this.setState({ meals, loaded: true });
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 404) {
            this.setState({
              meals: []
            });
          } else if (status === 401) {
            localStorage.removeItem("token");
          }
        } else if (error.request) {
          notify.show("Wrong request", "warning", 4000);
        }
      });
  };

  // always called before the component's first render
  // fetches the meals list
  componentWillMount() {
    this.getMeals();
  }

  //delete meal from meals list
  ConfirmDelete(id) {
    axiosInstance.delete(`/meals/${id}`).then(response => {
      notify.show(response.data.message, "success", 4000);
      document.getElementById(`cancelModal${id}`).click();
      this.getMeals();
    });
  }

  //edit meal on meals list
  EditMeal(id, meal_name, price) {
    axiosInstance
      .put(`/meals/${id}`, {
        meal_name,
        price
      })
      .then(response => {
        notify.show(response.data.message, "success", 4000);
        document.getElementById(`closeEditModal${id}`).click();
        this.getMeals();
      })
      .catch(error => {
        if (error.response) {
          this.setState({ message: error.response.data.message });
        } else if (error.request) {
          notify.show("Network error", "error", 4000);
        }
      });
  }
  //add meal to menu
  handleAddMenu = (id, meal_name, price) => {
    axiosInstance
      .post(`/menu/${id}`)
      .then(response => {
        const menu = response.data;
        this.setState({ menu });
        notify.show(response.data.message, "success", 4000);
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response;
          if (status === 404) {
            this.setState({
              menu: []
            });
          }
          if (status === 409) {
            notify.show(error.response.data.message, "error", 4000);
          }
        } else if (error.request) {
          notify.show("Network error", "error", 4000);
        }
      });
  };
  render() {
    const { meals, loaded } = this.state;

    const mealDetails =
      meals.length === 0 ? (
        <div>No Meals Found</div>
      ) : (
        meals.map(meal => (
          <div key={meal.id}>
            <Meal
              handleAddMenu={this.handleAddMenu}
              ConfirmDelete={() => this.ConfirmDelete(meal.id)}
              EditMeal={this.EditMeal}
              id={meal.id}
              mealName={meal.meal_name}
              price={meal.price}
              key={meal.id}
              message={this.state.message}
            />
          </div>
        ))
      );

    return (
      <div className="container-fluid">
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#addModal"
        >
          New Meal
        </button>
        <div className="row">
          <div className="meal-list">
            <h2 className="header text-center">Meals List</h2>
            <Loader loaded={loaded}>
              <div className="row">{mealDetails}</div>
            </Loader>
          </div>
        </div>
        <Add getMeals={this.getMeals} />
      </div>
    );
  }
}
export default AdminDashboard;
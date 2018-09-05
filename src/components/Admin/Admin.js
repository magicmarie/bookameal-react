import React, { Component } from "react";
import Loader from "react-loader";
import { notify } from "react-notify-toast";
import axiosInstance from "../common/Apicalls";
import Meal from "./Meal";
import Add from "./Add";
import AddToMenu from "./AddToMenu";
import Pagination from "../common/Pagination";

class AdminDashboard extends Component {
  state = {
    meals: [],
    loaded: false,
    days: [],
    mealId: 0,
    isMealSet: true,
    nextPage: null,
    previousPage: null,
    currentPage: null,
    pages: null,
    totalCount: null
  };
  //get all meals created by admin
  getMeals = () => {
    // create a variable for page to be current page
    const page = this.state.currentPage || 1;
    axiosInstance
      .get("/meals", { params: { page } })
      .then(response => {
        const {
          currentPage,
          meals,
          nextPage,
          pages,
          perPage,
          previousPage,
          totalCount
        } = response.data.meal_items;
        this.setState({
          currentPage,
          meals,
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
              meals: []
            });
          } else if (status === 401) {
            localStorage.removeItem("token");
          }
        } else if (error.request) {
          notify.show("Wrong request", "warning", 2500);
        }
      });
  };

  // always called before the component's first render
  // fetches the meals list
  componentDidMount() {
    this.getMeals();
  }

  //delete meal from meals list: close modal, show success message, get all meals
  ConfirmDelete = id => {
    axiosInstance.delete(`/meals/${id}`).then(response => {
      notify.show(response.data.message, "success", 2500);
      document.getElementById(`cancelModal${id}`).click();
      this.getMeals();
    });
  };

  //edit meal on meals list
  EditMeal = (id, meal_name, price) => {
    axiosInstance
      .put(`/meals/${id}`, {
        meal_name,
        price
      })
      .then(response => {
        this.setState({
          meal_name: "",
          price: "",
          message: ""
        });
        notify.show(response.data.message, "success", 2500);
        document.getElementById(`closeEditModal${id}`).click();
        this.getMeals();
      })
      .catch(error => {
        if (error.response) {
          this.setState({ message: error.response.data.message });
        } else if (error.request) {
          notify.show("Network error", "error", 2500);
        }
      });
  };

  checked = (evt, day) => {
    const { days } = this.state;
    if (evt.target.checked) {
      days.push(day);
    } else {
      days.pop(day);
    }
  };

  setMealId = id => {
    this.setState({ mealId: id });
  };
  //pagination
  changePage = selectedPage => {
    this.setState(
      {
        currentPage: selectedPage
      },
      () => this.getMeals()
    );
  };

  //add meal to menu
  handleAddMenu = () => {
    this.setState({ isMealSet: false });
    const { mealId, days } = this.state;
    days.forEach(day => {
      axiosInstance
        .post(`/menu/${day}/${mealId}`)
        .then(response => {
          notify.show(response.data.message, "success", 2500);
          document.getElementById("closeAddToMenuModal").click();
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
              notify.show(error.response.data.message, "error", 2500);
            }
          } else if (error.request) {
            notify.show("Network error", "error", 2500);
          }
        });
    });
    this.setState({ isMealSet: true });
  };
  render() {
    const {
      meals,
      loaded,
      isMealSet,
      currentPage,
      pages,
      nextPage,
      previousPage
    } = this.state;
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    // if no meals, return message. else map thru the meals: meal card
    const mealDetails =
      meals.length === 0 ? (
        <div>No Meals Found</div>
      ) : (
        meals.map(meal => (
          <div className="col-md-3 col-lg-3" key={meal.id}>
            <Meal
              handleAddMenu={this.handleAddMenu}
              ConfirmDelete={() => this.ConfirmDelete(meal.id)}
              EditMeal={this.EditMeal}
              id={meal.id}
              setMealId={this.setMealId}
              mealName={meal.name}
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
        <hr />
        <div className="row">
          <div className="col meal-list">
            <h2 className="header text-center">Meals List</h2>
            <Loader loaded={loaded}>
              <div className="row">{mealDetails}</div>
            </Loader>
            <Pagination
              currentPage={currentPage}
              previousPage={previousPage}
              nextPage={nextPage}
              pages={pages}
              changePage={this.changePage}
            />
          </div>
        </div>
        <Add getMeals={this.getMeals} />
        <AddToMenu
          handleAddMenu={this.handleAddMenu}
          checked={this.checked}
          days={days}
          isMealSet={isMealSet}
        />
      </div>
    );
  }
}
export default AdminDashboard;

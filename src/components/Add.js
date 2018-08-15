import React, { Component } from "react";
import axiosInstance from "./common/Apicalls";
import { notify } from "react-notify-toast";

class Add extends Component {
  state = {
    meal_name: "",
    price: "",
    message: ""
  };
  handleNewMeal = event => {
    const { meal_name, price } = this.state;
    event.preventDefault();
    //create new meal
    axiosInstance
      .post("/meals", { meal_name, price })
      .then(response => {
        this.setState({
          meal_name: "",
          price: "",
          message: ""
        });
        //meal created: show success message, close th modal and update th meals list
        notify.show(response.data.message, "success", 4000);
        document.getElementById(`closeAddModal`).click();
        this.props.getMeals();
      })
      // meal not created, show errors
      .catch(error => {
        if (error.response) {
          this.setState({ message: error.response.data.message });
        } else if (error.request) {
          notify.show("Network error", "error", 4000);
        }
      });
  };
  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="addModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Create New meal
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.state.message && (
                  <div className="alert alert-danger">
                    {this.state.message}
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      arial-label="Close"
                    >
                      <span aria-hidden="true"> &times;</span>
                    </button>
                  </div>
                )}
                <form onSubmit={this.handleNewMeal}>
                  <div className="form-group">
                    <label htmlFor="text">Name</label>
                    <input
                      type="text"
                      name="meal_name"
                      value={this.state.meal_name}
                      onChange={this.onChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div>
                    <label htmlFor="number">Price</label>
                    <input
                      type="integer"
                      name="price"
                      value={this.state.price}
                      onChange={this.onChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    id="closeAddModal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Add;

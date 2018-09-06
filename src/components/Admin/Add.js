import React, { Component } from "react";
import PropTypes from "prop-types";
import { postNewMeal } from "./helper";

/**
 *@param {Event} event
 * @class Add
 * @extends {Component}
 */
class Add extends Component {
  state = {
    meal_name: "",
    price: "",
    message: ""
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  /**
   *@param {Event} event
   *@returns {null} null
   * @memberof Add
   */
  handleNewMeal = event => {
    const { meal_name, price } = this.state;
    // mtd to stop the default action of an element
    event.preventDefault();
    postNewMeal({ meal_name, price }, this);
    this.refs.modalClose.click();
    this.props.getMeals();
  };

  reset = () => {
    this.setState({
      meal_name: "",
      price: "",
      message: ""
    });
  };

  /**
   * @returns {div} renders a div
   * @memberof Add
   */
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
                  onClick={this.reset}
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
                    <label htmlFor="text">Name:</label>
                    <input
                      type="text"
                      name="meal_name"
                      value={this.state.meal_name}
                      onChange={this.onChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="number">Price:</label>
                    <input
                      type="integer"
                      name="price"
                      value={this.state.price}
                      onChange={this.onChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div>
                    <button
                      ref="modalClose"
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      id="closeAddModal"
                      onClick={this.reset}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary ml-3">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Add.propTypes = {
  postNewMeal: PropTypes.func.isRequired
};
export default Add;

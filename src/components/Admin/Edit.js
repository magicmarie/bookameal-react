import React, { Component } from "react";

/**
 * @param {Event} event
 * @class Edit
 * @extends {Component}
 */
class Edit extends Component {
  state = {
    meal_name: "",
    price: "",
    message: ""
  };

  /**
   *@returns {mealdetails} name, price
   * @memberof Edit
   */
  componentWillMount() {
    this.setState({ meal_name: this.props.meal_name, price: this.props.price });
  }

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleEditMeal = event => {
    event.preventDefault();
    this.props.EditMeal(this.props.id, this.state.meal_name, this.state.price);
  };

  /**
   * @returns {div} div
   * @memberof Edit
   */
  render() {
    return (
      <div>
        <div
          className="modal fade"
          id={`EditModal${this.props.id}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit {this.props.meal_name}
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
                {this.props.message && (
                  <div className="alert alert-danger">
                    {this.props.message}
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
                <form onSubmit={this.handleEditMeal}>
                  <div className="form-group">
                    <label htmlFor="text">Name:</label>
                    <input
                      type="text"
                      name="meal_name"
                      onChange={this.onChange}
                      value={this.state.meal_name}
                      required
                      className="form-control"
                      id="name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="number">Price:</label>
                    <input
                      type="integer"
                      name="price"
                      onChange={this.onChange}
                      value={this.state.price}
                      required
                      className="form-control"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={this.reset}
                      id={`closeEditModal${this.props.id}`}
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
export default Edit;

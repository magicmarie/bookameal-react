import React from "react";
import Loader from "react-loader";

const AddMenuModal = ({ checked, days, handleAddMenu, isMealSet}) => (
  <div>
    <div
      className="modal fade"
      id="addToMenuModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Choose days on which to add the meal
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
            <Loader loaded={isMealSet} />
            {days.map(day => (
              <div key={day} className="form-check form-group">
                <input
                  type="checkbox"
                  name="day"
                  onChange={evt => checked(evt, day)}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="isadmin">
                  {day}
                </label>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              id="closeAddToMenuModal"
            >
              Close
            </button>
            <button
              onClick={handleAddMenu}
              type="button"
              className="btn btn-primary ml-3"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AddMenuModal;

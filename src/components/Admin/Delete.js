import React from "react";
import { CloseModalButton } from "../common/Helper";

// delete meal modal
const DeleteMeal = props => (
  <div>
    <div id={`deleteModal${props.id}`} className="modal fade">
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Are you sure?</h4>
            <CloseModalButton />
          </div>
          <div className="modal-body">
            <p>
              Do you really want to delete <strong>{props.meal_name}</strong>?
              This process cannot be undone.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-info"
              data-dismiss="modal"
              id={`cancelModal${props.id}`}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => props.ConfirmDelete(props.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DeleteMeal;

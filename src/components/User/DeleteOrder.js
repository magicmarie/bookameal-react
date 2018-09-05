import React from "react";

// delete order modal

const DeleteOrder = props => (
  <div>
    <div id={`deleteOrderModal${props.id}`} className="modal fade">
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Are you sure?</h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>
              Do you really want to delete <strong>{props.meal_name}</strong>{" "}
              from your orders? This process cannot be undone.
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
              onClick={() => props.ConfirmDeleteOrder(props.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DeleteOrder;

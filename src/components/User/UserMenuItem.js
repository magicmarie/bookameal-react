import React from "react";

// menu card: customer side
const UserMenuItem = props => (
  <div className="menu-item">
    <div className="row">
      <div className="col-sm-6">
        <p>{props.mealName}</p>
      </div>
      <div className="col-sm-3">
        <p>
          <span className="badge badge-secondary">{props.price}</span>
        </p>
      </div>
      <div className="col-sm-3">
        <p>
          <button
            to="#"
            className="add"
            title="make an order"
            // onClick={() => props.handleAddOrder(props.id, props.mealId)}
            onClick={() =>
              props.handleAddCart(
                props.mealId,
                props.mealName,
                props.price,
                props.adminName
              )
            }
          >
            Add to Cart
          </button>
        </p>
      </div>
    </div>
  </div>
);
export default UserMenuItem;

import React from "react";

// menu card: customer side
const UserMenuItem = props => (
  <div className="menu-item">
    <div className="row menuitem">
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
            className="btn add"
            title="add to cart"
            onClick={() =>
              props.handleAddCart(
                props.mealId,
                props.mealName,
                props.price,
                props.adminName,
                props.id
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

import React from "react";
import { Link } from "react-router-dom";

//menu meal card: admin side
const Menu = props => (
  <div className="card mb-2 meal" style={{ width: "12rem", height: "8rem" }}>
    <div className="card-body text-center">
      <div className="card-text"> {props.mealName}</div>
      <div className="card-text">{props.price}</div>
      <div className="row">
        <Link
          to="#"
          className="btn btn-primary btn-sm centered"
          data-toggle="modal"
          data-target="#orderModal"
          onClick={() =>
            props.handleAddOrder(props.id, props.mealName, props.price)
          }
        >
          Add
        </Link>
      </div>
    </div>
  </div>
);
export default Menu;

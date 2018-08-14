import React from "react";
import { Link } from "react-router-dom";
import Delete from "./Delete";
import Edit from "./Edit";

//meal card: admin side
const Meal = props => (
  <div className="card mb-2 meal" style={{ width: "12rem", height: "8rem" }}>
    <div className="card-body text-center">
      <div className="card-text"> {props.mealName}</div>
      <div className="card-text">{props.price}</div>
      <div className="row">
        <Link
          to="#"
          data-toggle="modal"
          className="btn btn-primary btn-sm mealcard"
          data-target="#menuModal"
          onClick={() =>
            props.handleAddMenu(props.id, props.mealName, props.price)
          }
        >
          Add
        </Link>
        <Link
          to="#"
          data-toggle="modal"
          data-target={`#EditModal${props.id}`}
          className="btn btn-success btn-sm mealcard"
        >
          Edit
        </Link>
        <Link
          to="#"
          className="btn btn-danger btn-sm"
          data-toggle="modal"
          data-target={`#deleteModal${props.id}`}
        >
          Delete
        </Link>
      </div>
      <Delete
        id={props.id}
        meal_name={props.mealName}
        ConfirmDelete={props.ConfirmDelete}
      />
      <Edit
        meal_name={props.mealName}
        id={props.id}
        price={props.price}
        EditMeal={props.EditMeal}
        message={props.message}
      />
    </div>
  </div>
);

export default Meal;

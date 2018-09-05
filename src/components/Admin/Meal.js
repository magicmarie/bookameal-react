import React from "react";
import { Link } from "react-router-dom";
import Delete from "./Delete";
import Edit from "./Edit";

// meal card: admin side
const Meal = props => (
  <div className="card mb-2 meal">
    <div className="card-body text-center">
      <div className="card-text"> {props.mealName}</div>
      <div className="card-text">{props.price}</div>
      <hr />
      <div className="row1">
        <Link
          to="#"
          data-toggle="modal"
          className="mealcard fa
          fa-plus icon"
          aria-hidden="false"
          data-target="#addToMenuModal"
          title="add to menu"
          onClick={() => props.setMealId(props.id)}
        />
        <Link
          to="#"
          data-toggle="modal"
          title="edit meal"
          data-target={`#EditModal${props.id}`}
          className="fa fa-edit icon mealcard"
        />
        <Link
          to="#"
          className="fa fa-trash icon mealcard"
          data-toggle="modal"
          title="delete meal"
          data-target={`#deleteModal${props.id}`}
        />
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
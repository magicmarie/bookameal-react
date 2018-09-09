import React from "react";
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
        <button
          to="#"
          data-toggle="modal"
          className="mealcard fa
          fa-plus icon"
          id="add-to-menu"
          aria-hidden="false"
          data-target="#addToMenuModal"
          title="add to menu"
          onClick={() => props.setMealId(props.id)}
        />
        <button
          to="#"
          data-toggle="modal"
          title="edit meal"
          data-target={`#EditModal${props.id}`}
          className="fa fa-edit icon mealcard"
        />
        <button
          to="#"
          id="delete"
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

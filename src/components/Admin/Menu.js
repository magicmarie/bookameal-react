import React from "react";
import { Link } from "react-router-dom";
import Delete from "./DeleteFromMenu";

// menu meal card: admin side
const Menu = props => (
  <div className="card mb-2 meal">
    <div className="card-body text-center">
      <div className="card-text"> {props.mealName}</div>
      <div className="card-text">{props.price}</div>
      <hr />
      <button
        to="#"
        className="fa fa-trash icon mealcard"
        data-toggle="modal"
        title="delete meal"
        data-target={`#deleteFromMenuModal${props.id}`}
      />
      <Delete
        id={props.id}
        mealName={props.mealName}
        ConfirmDeleteMeal={props.ConfirmDeleteMeal}
      />
    </div>
  </div>
);
export default Menu;

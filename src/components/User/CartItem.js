import React from "react";

// cart item card: customer side
const CartItem = props => (
  <div>
    <tr>
      <th scope="row">{props.mealName}</th>
      <td>{props.price}</td>
      <td>3</td>
      <td>{props.adminName}</td>
      <td>30000UGX</td>
      <td>
        <button
          className="fa fa-check-circle"
          onClick={() => props.handleAddOrder(props.id, props.mealId)}
        />
      </td>
      <td>
        <button className="fa fa-remove" />
      </td>
    </tr>
  </div>
);
export default CartItem;

import React from "react";

// cart item card: customer side
const CartItem = props => (
  <tr>
    <td>{props.adminName}</td>
    <td>{props.mealName}</td>
    <td>
      <select
        onChange={evt => props.onChange(evt, props.id)}
        defaultValue={props.quantity}
        name="quantity"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </td>

    <td>UGX {props.price}</td>
    <td>UGX {props.quantity * props.price}</td>
    <td>
      <button
        onClick={() => props.removeItem(props.id)}
        className="fa fa-remove text-danger"
      />
    </td>
  </tr>
);
export default CartItem;

import React from "react";
import WeekDays from "../common/WeekDays";
import { AppContext } from "../../appContext";
import Pagination from "./Pagination";

export const HelpDiv = props => (
  <div className="col-md-2">
    <div className="header">Days</div>
    <ul className="list-group">
      <WeekDays {...props} />
    </ul>
  </div>
);

export const contextWrapper = Component =>
  React.forwardRef((props, ref) => (
    <AppContext.Consumer>
      {context => <Component {...props} context={context} ref={ref} />}
    </AppContext.Consumer>
  ));

export const Input = ({ label, type, name, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      required
      className="form-control"
    />
  </div>
);

export const Form = ({ formFields, onChange }) =>
  formFields.map(field => (
    <Input
      key={field.name}
      label={field.label}
      name={field.name}
      type={field.type}
      value={field.value}
      onChange={onChange}
    />
  ));

export const CloseModalButton = () => (
  <button
    type="button"
    className="close"
    data-dismiss="modal"
    aria-hidden="true"
  >
    &times;
  </button>
);

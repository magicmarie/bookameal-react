import React from "react";

const Days = ({ getMenu }) => {
  const daysList = [
    { key: "monday", value: "Monday" },
    { key: "tuesday", value: "Tuesday" },
    { key: "wednesday", value: "Wednesday" },
    { key: "thursday", value: "Thursday" },
    { key: "friday", value: "Friday" },
    { key: "saturday", value: "Saturday" },
    { key: "sunday", value: "Sunday" }
  ];
  const days = daysList.map((day, i) => (
    <li key={i} className="list-group-item">
      <button
        onClick={() => getMenu(day.key)}
        className="btn btn-block btn-lg"
        data-day={day.key}
      >
        {day.value}
      </button>
    </li>
  ));
  return days;
};
export default Days;

import React from "react";

const getCurrentDay = () => {
  const numberDay = new Date().getDay();
  const days = [
    { key: 1, name: "Monday" },
    { key: 2, name: "Tuesday" },
    { key: 3, name: "Wednesday" },
    { key: 4, name: "Thursday" },
    { key: 5, name: "Friday" },
    { key: 6, name: "Saturday" },
    { key: 7, name: "Sunday" }
  ];
  const today = days.find(day => day.key === numberDay);
  return today.name;
};
export default getCurrentDay;

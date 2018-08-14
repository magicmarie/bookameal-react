import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import mockLocalStorage from "./MockLocalStorage";

global.localStorage = mockLocalStorage;

describe("App", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage
    });
  });

  afterEach(() => {
    // console.log(window.localStorage.getItem(""));
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

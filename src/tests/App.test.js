import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

describe("App", () => {
  beforeEach(() => {
    localStorage.setItem(
      "token",
      jwt.sign(
        { email: "test@test.com", name: "test", is_admin: "True", id: 1 },
        "secret"
      )
    );
  });

  afterEach(() => {});

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

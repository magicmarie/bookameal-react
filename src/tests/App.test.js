import React from "react";
import { shallow } from "enzyme";
import jwt from "jsonwebtoken";
import App from "../App";

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
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});

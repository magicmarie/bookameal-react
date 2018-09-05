import React from "react";
import { shallow } from "enzyme";
import Login from "../../components/Auth/Login";

describe("Login component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });
  it("User creates account successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

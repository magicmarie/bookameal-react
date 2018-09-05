import React from "react";
import { shallow } from "enzyme";
import Signup from "../../components/Auth/Signup";

describe("Signup component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Signup />);
  });
  it("User creates account successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

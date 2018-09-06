import React from "react";
import { shallow } from "enzyme";
import UserCart from "../../components/User/UserCart";

describe("UserCartu component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserCart />);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

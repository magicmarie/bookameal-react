import React from "react";
import { shallow } from "enzyme";
import UserCart from "../../components/User/UserCart";

describe("UserCart component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserCart makeOrder={jest.fn()} />);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
  // it("renders successfully", () => {
  //   const handleEvent = jest.fn();
  //   wrapper.find("button.btn-primary").simulate("click", handleEvent);
  // });
});

import React from "react";
import { shallow } from "enzyme";
import UserMenuItem from "../../components/User/UserMenuItem";

describe("UserCart component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserMenuItem handleAddCart={jest.fn()} />);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("renders successfully", () => {
    const handleEvent = jest.fn();
    wrapper.find("button.add").simulate("click", handleEvent);
  });
});

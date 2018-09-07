import React from "react";
import { shallow } from "enzyme";
import CartItem from "../../components/User/CartItem";

describe("UserDashboard component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CartItem removeItem={jest.fn()} onChange={jest.fn()} />);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("renders successfully", () => {
    const handleEvent = jest.fn();
    wrapper.find("button.fa-remove").simulate("click", handleEvent);
  });
  it("renders successfully", () => {
    const handleEvent = jest.fn();
    wrapper.find('[name="quantity"]').simulate("change", handleEvent);
  });
});

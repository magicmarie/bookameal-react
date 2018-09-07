import React from "react";
import { shallow } from "enzyme";
import Admin from "../../components/Admin/Admin";

describe("AdminDashboard component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Admin />);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("renders successfully", () => {
    const handleEvent = jest.fn()
    wrapper.find('button.btn-primary').simulate('click', handleEvent)
  });
});

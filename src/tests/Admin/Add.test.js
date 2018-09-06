import React from "react";
import { shallow } from "enzyme";
import Add from "../../components/Admin/Add";

describe("AddMeal component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Add />);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

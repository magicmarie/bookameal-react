import React from "react";
import { shallow } from "enzyme";
import Edit from "../../components/Admin/Edit";

describe("EditMeal component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Edit />);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

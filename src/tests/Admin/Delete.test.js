import React from "react";
import { shallow } from "enzyme";
import Delete from "../../components/Admin/Delete";

describe("DeleteMealModal component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Delete id={1} meal_name="test" />);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

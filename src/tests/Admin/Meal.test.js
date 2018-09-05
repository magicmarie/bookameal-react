import React from "react";
import { shallow } from "enzyme";
import Meal from "../../components/Admin/Meal";

describe("AdminMealCard component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Meal/>);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

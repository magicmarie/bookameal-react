import React from "react";
import { shallow } from "enzyme";
import Meal from "../../components/Admin/Meal";

describe("AdminMealCard component", () => {
  let wrapper;
  beforeEach(() => {
    const setMealId = jest.fn();
    wrapper = shallow(<Meal setMealId={setMealId} />);
  });
  it("should render correctly", () => {
    const handleEvent = jest.fn();
    wrapper.find("button#add-to-menu").simulate("click", handleEvent);
    expect(wrapper).toMatchSnapshot();
  });
});

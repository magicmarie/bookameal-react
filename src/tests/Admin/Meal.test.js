import React from "react";
import { shallow } from "enzyme";
import Meal from "../../components/Admin/Meal";

describe("AdminMealCard component", () => {
  let wrapper;
  beforeEach(() => {
    const setMealId = jest.fn();
    const confirmDelete = jest.fn();
    wrapper = shallow(
      <Meal setMealId={setMealId} confirmDelete={confirmDelete} />
    );
  });
  it("should render correctly", () => {
    const handleEvent = jest.fn();
    wrapper.find("button#add-to-menu").simulate("click", handleEvent);
    expect(wrapper).toMatchSnapshot();
  });
  it("should render correctly", () => {
    const handleEvent = jest.fn();
    wrapper.find("button#delete").simulate("click", handleEvent);
  });
});

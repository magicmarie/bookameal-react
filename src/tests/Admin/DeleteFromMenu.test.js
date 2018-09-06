import React from "react";
import { shallow } from "enzyme";
import DeleteMealFromMenu from "../../components/Admin/DeleteFromMenu";

describe("DeleteMealFromMenuCard component", () => {
  let wrapper;
  beforeEach(() => {
    const ConfirmDeleteMeal=jest.fn()
    wrapper = shallow(<DeleteMealFromMenu ConfirmDeleteMeal={ConfirmDeleteMeal}/>);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should confirm delete on click", () => {
    const handleEvent = jest.fn()
    wrapper.find('button.btn-danger').simulate('click', handleEvent)
  });
});

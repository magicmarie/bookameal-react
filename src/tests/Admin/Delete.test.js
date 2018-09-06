import React from "react";
import { shallow } from "enzyme";
import Delete from "../../components/Admin/Delete";

describe("DeleteMealModal component", () => {
  let wrapper;
  beforeEach(() => {
    const ConfirmDelete = jest.fn()
    wrapper = shallow(<Delete id={1} meal_name="test" ConfirmDelete={ConfirmDelete}/>);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should confirm delete on click", () => {
    const handleEvent = jest.fn()
    wrapper.find('button.btn-danger').simulate('click', handleEvent)
  });
});

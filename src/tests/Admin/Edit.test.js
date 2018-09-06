import React from "react";
import { shallow } from "enzyme";
import Edit from "../../components/Admin/Edit";

describe("EditMeal component", () => {
  let wrapper;
  beforeEach(() => {
    const setState = jest.fn();
    wrapper = shallow(<Edit EditMeal={setState} />);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("handles change of event", () => {
    wrapper.setState({
      meal_name: "chicken"
    });
    wrapper
      .find("#name")
      .simulate("change", { target: { meal_name: "chicken" } });
    expect(wrapper.find('[name="meal_name"]').props().value).toEqual("chicken");
    expect();
  });

  it("handles edit meal", () => {
    const handleEvent = { preventDefault: () => jest.fn() };
    wrapper.find("form").simulate("submit", handleEvent);
    expect(wrapper.find('form').exists()).toEqual(true);
  });
});

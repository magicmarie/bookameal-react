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
// it("renders successfully", () => {
//   wrapper.setState({
//     meal_name: "chicken"
//   });
//   wrapper
//     .find('[name="meal_name"]')
//     .simulate("change", { target: { meal_name: "chicken" } });
//   expect(wrapper.find('[name="meal_name"]').props().value).toEqual("chicken");
// });

// it("renders successfully", () => {
//   wrapper.setState({
//     meal_name: "",
//     price: "",
//     message: ""
//   });
//   wrapper.find("button#closeAddModal").simulate("click");
//   expect(wrapper.find('[name="meal_name"]').props().value).toEqual("");
// });

// it("renders successfully", () => {
//   const handleEvent = { preventDefault: () => jest.fn() };
//   wrapper.setState({
//     meal_name: "",
//     price: ""
//   });
//   wrapper.find("form").simulate("submit", handleEvent);
//   console.log(wrapper.ref('modalClose'));
// expect(wrapper.find('[name="meal_name"]').props().value).toEqual("");

// });
// });

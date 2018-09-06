import React from "react";
import { shallow } from "enzyme";
import Signup from "../../components/Auth/Signup";

describe("Signup component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Signup />);
    let preventDefault = jest.fn();
  });
  it("User creates account successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
  // it("has a form", () => {
  //   expect(wrapper.find("form").length).toBe(1);
  //   expect(wrapper.find("form").simulate("submit", { preventDefault }));
  //   expect(preventDefault).toBeCalled();
  // });
  it("renders inputs", () => {
    expect(wrapper.find("input").length).toBe(4);
  });
  it("renders component in div", () => {
    expect(wrapper.find("div").length).toBe(8);
  });
  it("has the correct form fields", () => {
    expect(wrapper.find("#name")).toHaveLength(1);
    expect(wrapper.find('[name="email"]')).toHaveLength(1);
    expect(wrapper.find('[name="password"]')).toHaveLength(1);
    expect(wrapper.find('[name="is_admin"]')).toHaveLength(1);
  });
  it("has empty form fields", () => {
    expect(wrapper.find("#name").props().value).toEqual("");
    expect(wrapper.find('[name="email"]').props().value).toEqual("");
    expect(wrapper.find('[name="password"]').props().value).toEqual("");
  });
  it("Form fields update when state changes", () => {
    wrapper.setState({
      name: "marie",
      password: "marie",
      email: "marie@gmail.com"
    });
    expect(wrapper.find('[name="password"]').props().value).toEqual("marie");
    expect(wrapper.find("#name").props().value).toEqual("marie");
    expect(wrapper.find('[name="email"]').props().value).toEqual(
      "marie@gmail.com"
    );
  });
});

import React from "react";
import { shallow } from "enzyme";
import Login from "../../components/Auth/Login";

describe("Login component", () => {
  let wrapper;
  let preventDefault, login;
  beforeEach(() => {
    wrapper = shallow(<Login />);
    preventDefault = jest.fn();
    login = jest.fn();
  });
  it("User creates account successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
  // it("it renders state initially", () => {
  //   expect(wrapper.state().email).toEqual("");
  //   expect(wrapper.state().password).toEqual("");
  // });
  // it("has the correct form fields", () => {
  //   expect(wrapper.find('[name="email"]')).toHaveLength(1);
  //   expect(wrapper.find('[name="password"]')).toHaveLength(1);
  // });
  // it("Form fields update when state changes", () => {
  //   wrapper.setState({ password: "marie", email: "marie@gmail.com" });
  //   expect(wrapper.find('[name="email"]').props().value).toEqual(
  //     "marie@gmail.com"
  //   );
  //   expect(wrapper.find('[name="password_field"]').props().value).toEqual(
  //     "marie"
  //   );
  // });
});

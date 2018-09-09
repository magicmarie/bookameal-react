import React from "react";
import { shallow } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import Signup from "../../components/Auth/Signup";
import axiosInstance from "../../components/common/Apicalls";

describe("Signup component", () => {
  let wrapper;
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
    wrapper = shallow(<Signup />);
  });

  it("renders successfully", () => {
    const name = "marie";
    const email = "marie@gmail.com";
    const password = "jrtjjfgn";
    const is_admin = "True";

    const event = {
      preventDefault: mockFn
    };
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onPost("/auth/signup").reply(201, {
      message: "User created successfully"
    });
    wrapper.instance().handleSignup(event, name, email, password, is_admin);
    expect(mockFn.mock.calls.length).toEqual(1);
  });

  it("handles errors on signup", () => {
    const name = "marie";
    const email = "marie@gmail.com";
    const password = "jrtjjfgn";
    const is_admin = "True";
    const event = {
      preventDefault: mockFn
    };
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onPost("/auth/signup").reply(400, {
      message: "failed"
    });
    wrapper.instance().handleSignup(event, name, email, password, is_admin);
  });
  it("should change state", async () => {
    const { is_admin } = wrapper.instance().state;
    expect(is_admin).toEqual(false);
    const evt = {
      target: {
        checked: true,
        name: "is_admin"
      }
    };
    wrapper.instance().onChange(evt);
    expect(wrapper.instance().state.is_admin).toEqual(true);
    const event = {
      target: {
        name: "title",
        value: "test"
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.instance().state.title).toBe(event.target.value);
  });
  it("User creates account successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
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

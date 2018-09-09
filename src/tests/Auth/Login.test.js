import React from "react";
import { shallow } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import { Login } from "../../components/Auth/Login";
import axiosInstance from "../../components/common/Apicalls";

describe("login", () => {
  let wrapper;
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
    const context = {
      login: mockFn
    };

    const history = {
      push: jest.fn()
    };

    wrapper = shallow(<Login context={context} history={history} />);
  });

  it("change state", () => {
    const event = {
      target: {
        name: "email",
        value: "marie@gmail.com"
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.instance().state.email).toEqual(event.target.value);
  });

  it("should handle login", async () => {
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onPost("/auth/login").reply(201, {
      message: "User created successfully",
      token: localStorage.getItem("token")
    });
    const evt = {
      preventDefault: mockFn
    };
    await wrapper.instance().handleLogin(evt);
    expect(mockFn.mock.calls.length).toEqual(1);
  });

  it("should successfully handle errors on login", () => {
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onPost("/auth/login").reply(400, {
      message: "failed",
      token: localStorage.getItem("token")
    });
    const evt = {
      preventDefault: mockFn
    };
    wrapper.instance().handleLogin(evt);
    expect(mockFn.mock.calls.length).toEqual(1);
  });

  it("should render successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

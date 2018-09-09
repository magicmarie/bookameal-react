import React from "react";
import { shallow } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../../components/common/Apicalls";
import Add from "../../components/Admin/Add";

describe("AddMeal component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Add getMeals={jest.fn()} reset={jest.fn()} />);
    wrapper.instance().setState({ message: "error" });
  });

  it("should change state", () => {
    const evt = {
      target: {
        name: "title",
        value: "test"
      }
    };

    wrapper.instance().onChange(evt);
    expect(wrapper.instance().state.title).toBe(evt.target.value);
  });

  it("renders correctly", () => {
    wrapper.instance().reset();
    expect(wrapper.instance().state.price).toBe("");
  });

  it("should successfully add a new meal", () => {
    const mock = new MockAdapter(axiosInstance);
    mock.onPost(`/meals`).reply(200, {
      message: "success"
    });
    const modal = document.createElement("div");
    modal.setAttribute("id", "closeAddModal");
    document.body.appendChild(modal);

    const mockFn = jest.fn();

    const event = {
      preventDefault: mockFn
    };
    wrapper.instance().handleNewMeal(event);
    expect(mockFn.mock.calls.length).toEqual(1);
  });

  it("should fail to add a new meal", () => {
    const failmock = new MockAdapter(axiosInstance);
    failmock.onPost(`/meals`).reply(400, {
      message: "failed"
    });
  });
  it("should reset state", () => {
    const fn = jest.fn();
    const evt = {
      preventDefault: fn
    };
    wrapper.instance().handleNewMeal(evt);
    expect(fn.mock.calls.length).toEqual(1);
  });

  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { mount } from "enzyme";
import WeekDays from "../../components/common/WeekDays";

describe("WeekDays component", () => {
  let wrapper;
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
    wrapper = mount(<WeekDays getMenu={mockFn} />);
  });
  it("renders succesfully", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should show meals on clicking", () => {
    wrapper
      .find("#monday")
      .first()
      .simulate("click");

    expect(mockFn.mock.calls.length).toBe(1);
  });
});

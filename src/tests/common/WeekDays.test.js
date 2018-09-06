import React from "react";
import { shallow } from "enzyme";
import WeekDays from "../../components/common/WeekDays";

describe("WeekDays component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WeekDays />);
  });
  it("renders succesfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import CurrentDay from "../../components/common/CurrentDay";

describe("AdminDashboard component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CurrentDay />);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

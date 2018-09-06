import React from "react";
import { shallow } from "enzyme";
import User from "../../components/User/User";

describe("UserDashboard component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<User/>);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import Menu from "../../components/Admin/Menu";

describe("AdminMenuCard component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Menu />);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

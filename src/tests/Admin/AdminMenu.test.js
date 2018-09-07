import React from "react";
import { shallow } from "enzyme";
import AdminMenu from "../../components/Admin/AdminMenu";

describe("AdminMenu component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AdminMenu />);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

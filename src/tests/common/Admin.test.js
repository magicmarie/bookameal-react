import React from "react";
import { shallow } from "enzyme";
import Admin from "../../components/common/Admin";

describe("AuthRoute component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Admin />);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

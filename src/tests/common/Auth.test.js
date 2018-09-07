import React from "react";
import { shallow } from "enzyme";
import Auth from "../../components/common/Auth";

describe("AuthRoute component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Auth />);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

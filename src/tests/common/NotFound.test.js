import React from "react";
import { shallow } from "enzyme";
import NotFound from "../../components/common/NotFound";

describe("NotFound component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NotFound />);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

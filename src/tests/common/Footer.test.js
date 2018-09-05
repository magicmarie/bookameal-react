import React from "react";
import { shallow } from "enzyme";
import Footer from "../../components/common/Footer";

describe("Footer component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

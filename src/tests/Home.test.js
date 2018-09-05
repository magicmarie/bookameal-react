import React from "react";
import { shallow } from "enzyme";
import Home from "../components/Home";

describe("Home component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import AppProvider from "../appContext";

describe("app context api", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppProvider />);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

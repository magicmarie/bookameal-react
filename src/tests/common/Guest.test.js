import React from "react";
import { shallow } from "enzyme";
import Guest from "../../components/common/Guest";

describe("GuestRoute component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Guest />);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

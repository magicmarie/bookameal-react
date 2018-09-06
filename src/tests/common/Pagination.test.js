import React from "react";
import { shallow } from "enzyme";
import Pagination from "../../components/common/Pagination";

describe("Pagination component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Pagination />);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import Pagination from "../../components/common/Pagination";

describe("Pagination component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Pagination pages={10} currentPage={9} nextPage={10} previousPage={8} changePage={jest.fn()} event={jest.fn()} />);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("renders successfully", () => {
    const handleEvent = {
      preventDefault: jest.fn(),
      target: { dataset: "x" }
    };
    wrapper.find(".mb-4").simulate("click", handleEvent);
  });
  it("renders successfully", () => {
    const handleEvent = {
      preventDefault: jest.fn(),
      target: { dataset: 8 }
    };
    wrapper.find("#previous").simulate("click", handleEvent);
  });
});

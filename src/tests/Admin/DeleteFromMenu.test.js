import React from "react";
import { shallow } from "enzyme";
import DeleteMealFromMenu from "../../components/Admin/DeleteFromMenu";

describe("DeleteMealFromMenuCard component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DeleteMealFromMenu />);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

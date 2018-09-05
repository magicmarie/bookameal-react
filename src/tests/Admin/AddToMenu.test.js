import React from "react";
import { shallow } from "enzyme";
import AddToMenu from "../../components/Admin/AddToMenu";

describe("AddToMenuCard component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <AddToMenu
        checked={jest.fn}
        days={["Monday", "Tuesday"]}
        handleAddToMenu={jest.fn}
        isMealSet
      />
    );
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

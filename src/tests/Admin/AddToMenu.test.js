import React from "react";
import { shallow } from "enzyme";
import AddToMenu from "../../components/Admin/AddToMenu";

describe("AddToMenuCard component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <AddToMenu
        checked={jest.fn}
        days={["Monday"]}
        handleAddToMenu={jest.fn}
        isMealSet
      />
    );
  });
  it("should render correctly", () => {
    const handleEvent = jest.fn();
    wrapper.find(".form-check-input").simulate("change", handleEvent);
  });
});

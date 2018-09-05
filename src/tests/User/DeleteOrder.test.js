import React from "react";
import { shallow } from "enzyme";
import DeleteOrder from "../../components/User/DeleteOrder";

describe("DeleteOrder component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <DeleteOrder id={1} meal_name="test" ConfirmDeleteOrder={jest.fn} />
    );
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

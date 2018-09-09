import React from "react";
import { shallow } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../../components/common/Apicalls";
import { UserCart } from "../../components/User/UserCart";

describe("UserCart component", () => {
  let wrapper;
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
    const context = {
      clearCart: mockFn,
      setQuantity: mockFn,
      getCart: () => [
        {
          meal_id: 1,
          quantity: 1,
          menu_id: 1,
          meal_name: "test",
          price: 1000,
          adminName: "test"
        }
      ]
    };
    const history = {
      push: mockFn
    };
    wrapper = shallow(
      <UserCart makeOrder={jest.fn()} context={context} history={history} />
    );
  });

  it("should handle change", () => {
    const evt = {
      target: {
        value: 1
      }
    };
    wrapper.instance().onChange(evt, 1);
    expect(mockFn.mock.calls.length).toEqual(1);
  });

  it("should make order", async () => {
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onPost("/orders").reply(200, {});
    await wrapper.instance().makeOrder();
    expect(mockFn.mock.calls.length).toEqual(0);
  });

  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

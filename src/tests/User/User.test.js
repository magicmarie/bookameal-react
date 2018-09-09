import React from "react";
import { shallow } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import { UserDashboard } from "../../components/User/User";
import axiosInstance from "../../components/common/Apicalls";
import getCurrentDay from "../../components/common/CurrentDay";

describe("UserDashboard component", () => {
  let data;
  let wrapper;
  let mockFn;
  beforeEach(() => {
    data = [
      {
        id: 1,
        meals: [{ id: 1, menu_id: 1, name: "test", price: 1000 }],
        userName: "martha"
      }
    ];
    mockFn = jest.fn();
    const context = {
      setCart: mockFn
    };
    wrapper = shallow(<UserDashboard context={context} />);
  });

  it("should handle add to cart", () => {
    wrapper.instance().handleAddCart(1, "test", 1000, "test", 2);
    expect(mockFn.mock.calls.length).toEqual(1);
  });
  it("should handle get menus", async () => {
    // mock axios to handle requests made when component mounts
    const today = getCurrentDay();
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onGet(`/user-menus/${today}`).reply(200, {
      menus: data
    });
  });

  it("should catch errors on get menus ", () => {
    const today = getCurrentDay();
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onGet(`/user-menus/${today}`).reply(401, {});
  });

  it("gets menu", () => {
    const today = getCurrentDay();
    wrapper.instance().getMenu(today);
    const { currentDay } = wrapper.instance().state;
    expect(currentDay).toEqual(today);
  });

  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../../components/common/Apicalls";
import UserOrders from "../../components/User/UsersOrders";

describe("AdminMenuCard component", () => {
  let data;
  let wrapper;
  beforeEach(() => {
    data = {
      currentPage: 1,
      orders: [{ id: 1, meal_name: "test", price: 1000 }],
      nextPage: 2,
      pages: 2,
      previousPage: ""
    };
    wrapper = shallow(<UserOrders />);
  });
  it("renders successfully", () => {
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onGet("/user/orders").reply(200, {
      Orders: data
    });
  });

  it("fails successfully", () => {
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onGet("/user/orders").reply(401, {
      Orders: data
    });
  });
  it("changes page", () => {
    const { currentPage } = wrapper.instance().state;
    expect(currentPage).toBe(null);
    wrapper.instance().changePage(1);
    expect(wrapper.instance().state.currentPage).toBe(1);
  });
  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

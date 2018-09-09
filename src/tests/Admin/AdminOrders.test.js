import React from "react";
import { shallow } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import AdminOrders from "../../components/Admin/AdminOrders";
import axiosInstance from "../../components/common/Apicalls";

describe("AdminMenu component", () => {
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
    wrapper = shallow(<AdminOrders />);
  });
  it("renders successfully", async () => {
    const axiosMock = new MockAdapter(axiosInstance);
    await axiosMock.onGet("/orders").reply(200, {
      order_items: data
    });
    wrapper.instance().setState({ menus: data });
  });
  it("renders successfully", () => {
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onGet("/orders").reply(401, {
      order_items: data
    });
  });
  it("changes page", () => {
    const { currentPage } = wrapper.instance().state;
    expect(currentPage).toBe(null);
    wrapper.instance().changePage(1);
    expect(wrapper.instance().state.currentPage).toBe(1);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

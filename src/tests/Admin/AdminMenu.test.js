import React from "react";
import { shallow } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import AdminMenu from "../../components/Admin/AdminMenu";
import axiosInstance from "../../components/common/Apicalls";
import getCurrentDay from "../../components/common/CurrentDay";

describe("AdminMenu component", () => {
  let data;
  let wrapper;
  beforeEach(() => {
    data = [
      {
        id: 1,
        meals: [{ id: 1, meal_name: "test", price: 1000 }],
        name: getCurrentDay()
      }
    ];
    wrapper = shallow(<AdminMenu />);
  });
  it("renders successfully", async () => {
    const axiosMock = new MockAdapter(axiosInstance);
    await axiosMock.onGet("/admin-menus").reply(200, {
      menus: data
    });
  });
  it("it catches failures", () => {
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onGet("/admin-menus").reply(401, {
      menus: data
    });
  });
  it("manipulates array to get menu object", () => {
    const today = getCurrentDay();
    wrapper.instance().setState({ menus: data });
    wrapper.instance().getMenu(today);
    const { currentMenu } = wrapper.instance().state;
    expect(currentMenu).toEqual(data[0]);
  });

  it("should confirm delete", () => {
    const id = 1;
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onDelete(`/menu/${id}`).reply(200, {
      message: "success"
    });
    const modal = document.createElement("div");
    modal.setAttribute("id", `cancelModal${id}`);
    document.body.appendChild(modal);
    wrapper.instance().ConfirmDeleteMeal(id);
  });
  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

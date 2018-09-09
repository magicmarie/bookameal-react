import React from "react";
import { shallow } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import Admin from "../../components/Admin/Admin";
import axiosInstance from "../../components/common/Apicalls";

describe("AdminDashboard component", () => {
  let data;
  let wrapper;
  beforeEach(() => {
    data = {
      currentPage: 1,
      meals: [{ id: 1, meal_name: "test", price: 1000 }],
      nextPage: 2,
      pages: 2,
      previousPage: ""
    };

    wrapper = shallow(<Admin />);
  });
  it("renders successfully", () => {
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onGet("/meals").reply(200, {
      meal_items: data
    });
  });

  it("renders successfully", () => {
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onGet("/meals").reply(401, {
      meal_items: data
    });
  });

  it("should set meal id", () => {
    const { mealId } = wrapper.instance().state;
    expect(mealId).toBe(0);
    wrapper.instance().setMealId(1);
    expect(wrapper.instance().state.mealId).toBe(1);
  });

  it("should check days", () => {
    const { days } = wrapper.instance().state;
    expect(days).toEqual([]);

    const evt = {
      target: {
        checked: true
      }
    };

    // check a day
    wrapper.instance().checked(evt, "monday");
    expect(wrapper.instance().state.days).toEqual(["monday"]);

    // uncheck a day
    evt.target.checked = false;
    wrapper.instance().checked(evt, "monday");
    expect(wrapper.instance().state.days).toEqual([]);
  });

  it("should confirm delete", () => {
    const id = 1;
    const axiosMock = new MockAdapter(axiosInstance);
    axiosMock.onDelete(`/meals/${id}`).reply(200, {
      message: "success"
    });
    const modal = document.createElement("div");
    modal.setAttribute("id", `cancelModal${id}`);
    document.body.appendChild(modal);
    wrapper.instance().ConfirmDelete(id);
  });

  it("changes page", () => {
    const { currentPage } = wrapper.instance().state;
    expect(currentPage).toBe(null);
    wrapper.instance().changePage(1);
    expect(wrapper.instance().state.currentPage).toBe(1);
  });

  it("should edit meal", () => {
    const id = 1;
    const mealName = "test";
    const price = 1000;
    const editAxios = new MockAdapter(axiosInstance);
    editAxios.onPut(`/meals/${id}`).reply(200, {
      message: "success"
    });
    const modal = document.createElement("div");
    modal.setAttribute("id", `closeEditModal${id}`);
    document.body.appendChild(modal);
    wrapper.instance().EditMeal(id, mealName, price);
  });

  it("should fail on edit meal", () => {
    const id = 1;
    const mealName = "test";
    const price = 1000;
    const editAxios = new MockAdapter(axiosInstance);
    editAxios.onPut(`/meals/${id}`).reply(400, {
      data: {
        message: "failed"
      }
    });
    const modal = document.createElement("div");
    modal.setAttribute("id", `closeEditModal${id}`);
    document.body.appendChild(modal);
    wrapper.instance().EditMeal(id, mealName, price);
  });

  it("should successfully add meal to menu", () => {
    wrapper.instance().setState({ days: ["monday"], mealId: 1 });
    const mock = new MockAdapter(axiosInstance);
    mock.onPost(`/menu/monday/1`).reply(200, {
      data: {
        message: "success"
      }
    });
    wrapper.instance().handleAddMenu();
    expect(wrapper.instance().state.isMealSet).toBe(true);
  });

  it("should catch error on meal add to menu", () => {
    wrapper.instance().setState({ days: ["monday"], mealId: 1 });
    const mock = new MockAdapter(axiosInstance);
    mock.onPost(`/menu/monday/1`).reply(400, {
      data: {
        message: "failed"
      }
    });
    wrapper.instance().handleAddMenu();
    expect(wrapper.instance().state.isMealSet).toBe(true);
  });

  it("renders successfully", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders successfully", () => {
    const handleEvent = jest.fn();
    wrapper.find("button.btn-primary").simulate("click", handleEvent);
  });
});

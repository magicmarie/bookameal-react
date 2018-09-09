/* eslint-disable */
import jwt from "jsonwebtoken";

describe("Index", () => {
  it("should render without crashing", () => {
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
    require("../index");
  });
});

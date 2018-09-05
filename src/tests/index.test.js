/* eslint-disable */
import jwt from "jsonwebtoken";

describe("Index", () => {
  beforeEach(() => {
    localStorage.setItem(
      "token",
      jwt.sign(
        { email: "test@test.com", name: "test", is_admin: "True", id: 1 },
        "secret"
      )
    );
  });

  it("should render without crashing", () => {
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
    require("../index");
  });
});

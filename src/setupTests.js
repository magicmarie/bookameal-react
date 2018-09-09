import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { notify } from "react-notify-toast";
import jwt from "jsonwebtoken";

Enzyme.configure({ adapter: new Adapter() });

const mockStorage = {};

const mockLocalStorage = {
  setItem: (key, val) => Object.assign(mockStorage, { [key]: val }),
  getItem: key => mockStorage[key],
  removeItem: key => mockStorage[key]
};

global.localStorage = mockLocalStorage;
notify.show = jest.fn();

localStorage.setItem(
  "token",
  jwt.sign(
    { email: "test@test.com", name: "test", is_admin: "True", id: 1 },
    "secret"
  )
);

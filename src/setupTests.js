import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { notify } from "react-notify-toast";

Enzyme.configure({ adapter: new Adapter() });

const mockStorage = {};

const mockLocalStorage = {
  setItem: (key, val) => Object.assign(mockStorage, { [key]: val }),
  getItem: key => mockStorage[key]
};

global.localStorage = mockLocalStorage;
notify.show = jest.fn();

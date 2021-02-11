import HomePage from "./HomePage";
import { shallow } from "enzyme";

describe("HomePage", () => {
  let component;

  //   const roomCode = "FGWTw";

  beforeEach(() => {
    // updateCallback = jest.fn();
    component = shallow(<HomePage />);
    component.setState({ code: null });
  });

  //test for p greeting
  test("It has header", () => {
    expect(component.state("code")).toEqual(null);
    expect(component).toExist;
  });
});

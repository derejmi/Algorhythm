import Room from "./Room";
import { shallow } from "enzyme";

describe("Room", () => {
  let component, clearRoom;

  const staticContext = undefined;
  const push = jest.fn();
  const history = { push: push };
  const match = { params: { code: "TESTa" } };

  beforeEach(() => {
    const clearRoom = jest.fn();
    component = shallow(
      <Room
        clearRoom={clearRoom}
        staticContext={staticContext}
        history={history}
        match={match}
      />
    );
  });

  //test for p greeting

  test("Room exists", () => {
    const fetch = jest.fn(() => Promise.resolve());
    expect(component).toExist;
  });
});

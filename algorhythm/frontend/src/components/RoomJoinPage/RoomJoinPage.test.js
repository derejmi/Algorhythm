import RoomJoinPage from "./RoomJoinPage";
import { shallow } from "enzyme";

describe("RoomJoinPage", () => {
  let component, updateCallback;

  const staticContext = undefined;
  const match = { match: "mock" };
  const location = { location: "mock" };
  const push = jest.fn();
  const history = { push: push };

  beforeEach(() => {
    updateCallback = jest.fn();
    component = shallow(
      <RoomJoinPage
        staticContext={staticContext}
        match={match}
        location={location}
        history={history}
      />
    );
  });

  //test for p greeting
  test("It has a header", () => {
    expect(component.find("h1").text()).toContain("Join a Room");
  });
  test("It exists", () => {
    expect(component).toExist;
  });

  test("handleVotesChange", () => {
    let input = component.find("input");
    input.simulate("change", { target: { value: "TESTa" } });
    expect(component.state("roomCode")).toBe("TESTa");
  });

  test("roomButtonPressed runs", () => {
    const instance = component.instance();
    const roomButtonPressed = sinon.spy(instance, "roomButtonPressed");
    const button = component.find("#enter-room");
    button.simulate("click");
    expect(roomButtonPressed.calledOnce).toBe(true);
  });
});

import CreateRoomPage from "./CreateRoomPage";
import { shallow } from "enzyme";

describe("CreateRoomPage", () => {
  let component, updateCallback;

  const roomCode = null;
  const staticContext = undefined;
  const update = false;
  const votes_for_skip = 2;

  beforeEach(() => {
    updateCallback = jest.fn();
    component = shallow(
      <CreateRoomPage
        updateCallback={updateCallback}
        roomCode={roomCode}
        staticContext={staticContext}
        update={update}
        votes_for_skip={votes_for_skip}
      />
    );
  });

  //test for p greeting
  test("It has a paragraph welcoming the user", () => {
    expect(component.find("p").text()).toContain("This is the");
  });

  //test for form
  test("It has a form for room details", () => {
    let form = component.find("form");
    expect(form).toExist;
  });

  //test for label playback
  test("It has a label for the playback input ", () => {
    expect(component.find("#guest").text()).toContain("Guest Control");
  });
});

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

  //test labels
  test("It has a label for the playback input ", () => {
    expect(component.find("#guest").text()).toContain("Guest Control");
  });

  test("It has a label for the playback input ", () => {
    expect(component.find("#votes").text()).toContain("Votes Required");
  });

  //test inputs

  test("It renders a true radio button", () => {
    let input = component.find("#pause-true");
    expect(input.props().type).toBe("radio");
  });

  test("handleCanGuestPauseChange works", () => {
    let input = component.find("#pause-true");
    input.simulate("change", { target: { value: "true" } });
    expect(component.state("can_guests_pause")).toBe(true);
  });

  test("handleCanGuestPauseChange works", () => {
    let input = component.find("#pause-false");
    input.simulate("change", { target: { value: "false" } });
    expect(component.state("can_guests_pause")).toBe(false);
  });

  test("It has a false radio button ", () => {
    let input = component.find("#pause-false");
    expect(input.props().type).toBe("radio");
  });

  test("It has a votes input field ", () => {
    let input = component.find("#votes-input");
    expect(input.props().type).toBe("number");
  });

  test("handleVotesChange", () => {
    let input = component.find("#votes-input");
    input.simulate("change", { target: { value: "2" } });
    expect(component.state("can_guests_pause")).toBe(true);
  });

  test("handleEmail", () => {
    let input = component.find("#votes-input");
    input.simulate("change", { target: { value: "2" } });
    expect(component.state("can_guests_pause")).toBe(true);
  });

  //test for a button
  //test for form
  test("It has a form for room details", () => {
    let button = component.find("button");
    expect(button).toExist;
  });
});

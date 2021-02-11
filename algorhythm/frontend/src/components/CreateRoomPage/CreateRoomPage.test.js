import CreateRoomPage from "./CreateRoomPage";
import { shallow } from "enzyme";

describe("CreateRoomPage", () => {
  let component, updateCallback;

  const roomCode = null;
  const staticContext = undefined;
  const update = false;
  const votes_for_skip = 2;
  const push = jest.fn();
  const history = { push: push };

  beforeEach(() => {
    updateCallback = jest.fn();
    component = shallow(
      <CreateRoomPage
        updateCallback={updateCallback}
        roomCode={roomCode}
        staticContext={staticContext}
        update={update}
        votes_for_skip={votes_for_skip}
        history={history}
      />
    );
  });

  //test for p greeting
  test("It has a paragraph welcoming the user", () => {
    expect(component.find("p").text()).toContain("This is the");
  });

  test("CreateRoom exits", () => {
    expect(component).toExist;
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
    expect(component.state("votes_for_skip")).toBe("2");
  });

  test("handleEmail", () => {
    let input = component.find("#email-submit");
    input.simulate("change", { target: { value: "a@gmail.com" } });
    expect(component.state("email")).toBe("a@gmail.com");
  });

  test("Create Button area exists", () => {
    let createArea = component.find("#create-button");
    let label = createArea.find("label");
    expect(label.text()).toContain("Email");
    let emailSubmit = createArea.find("#email-submit");
    expect(emailSubmit.props().type).toBe("text");
    let submitBtn = createArea.find("#submit-btn");
    expect(submitBtn.props().type).toBe("submit");
    let backBtn = createArea.find("#back");
    expect(backBtn.text()).toContain("Back");
  });

  test("Back Button Works", () => {
    let backBtn = component.find("#back");
    let page = window.location.href;
    backBtn.simulate("click");
    let newPage = window.location.href;
    expect(newPage).toBe("http://localhost/");
  });

  //test for a button
  //test for form
  test("It has a form for room details", () => {
    let button = component.find("button");
    expect(button).toExist;
  });

  test("handleSubmit runs", () => {
    const instance = component.instance();
    const handleSubmit = sinon.spy(instance, "handleSubmit");
    const button = component.find("form");
    button.simulate("submit");
    expect(handleSubmit.calledOnce).toBe(true);
  });
});

describe("CreateRoomPage", () => {
  let component, updateCallback;

  const roomCode = "FGWTw";
  const staticContext = undefined;
  const update = true;
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
  test("It has a update button", () => {
    expect(component.find("#update-button").text()).toContain("Update Room");
  });

  test("handleUpdateButtonClick runs", () => {
    const instance = component.instance();
    const handleUpdateButtonClick = sinon.spy(
      instance,
      "handleUpdateButtonClick"
    );
    const button = component.find("#update-button");
    button.simulate("click");
    expect(handleUpdateButtonClick.calledOnce).toBe(true);
  });
});

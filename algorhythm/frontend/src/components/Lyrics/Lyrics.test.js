import Lyrics from "./Lyrics";
import { shallow } from "enzyme";

describe("CreateRoomPage", () => {
  let component;

  const artist = "Michael Jackson";
  const duration = 249013;
  const id = "4HAgm7e6vx4Ax33aUFxtEv";
  const image_url =
    "https://i.scdn.co/image/ab67616d0000b27316dec406ce3486fa4fe240a1";
  const is_playing = true;
  const popularity = 58;
  const required_votes = 4;
  const time = 22030;
  const title = "Thriller";
  const votes = 0;

  beforeEach(() => {
    component = shallow(
      <Lyrics
        artist={artist}
        duration={duration}
        id={id}
        image_url={image_url}
        is_playing={is_playing}
        popularity={popularity}
        required_votes={required_votes}
        time={time}
        title={title}
        votes={votes}
      />
    );
  });

  //test for p greeting
  test("Lyrics exists", () => {
    expect(component).toExist;
    expect(component.find("h1").text()).toContain("Lyrics");
    expect(component.state("artist")).toBe(undefined);
    expect(component.state("title")).toBe(undefined);
    let p = component.find("p");
    expect(p).toExist;
    let div = component.find("div");
    expect(div).toExist;
  });

  test("Lyrics exists", () => {
    component.setState({ lyrics: "hi" });
    expect(component.find("p").text()).toContain("hi");
  });

  test("Lyrics exists", () => {
    component.setState({ lyrics: "hi" });
    expect(component.find("p").text()).toContain("hi");
  });
  test("Lyrics exists", () => {
    const prevProps = { title: "PYT" };
    expect(component.state("artist")).toBe("Michael Jackson");
  });
});

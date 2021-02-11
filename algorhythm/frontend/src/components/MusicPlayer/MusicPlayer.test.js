import { LinearProgress } from "@material-ui/core";
import MusicPlayer from "./MusicPlayer";
import { shallow } from "enzyme";

describe("MusicPlayer", () => {
  let component;

  const artist = "Louis Armstrong, Bing Crosby";
  const duration = 149773;
  const id = "4CtfrD23jvrOZFnplFYJJp";
  const image_url =
    "https://i.scdn.co/image/ab67616d0000b2733ce4f7f05e9f35e6a3127b63";
  let is_playing = true;
  const popularity = 33;
  const time = 0;
  const title = "Gone Fishin'";
  const votes = 0;

  beforeEach(() => {
    component = shallow(
      <MusicPlayer
        artist={artist}
        duration={duration}
        id={id}
        image_url={image_url}
        is_playing={is_playing}
        popularity={popularity}
        time={time}
        title={title}
        votes={votes}
      />
    );
  });

  //test for img
  test("It loads the images", () => {
    let img = component.find("img");
    expect(img).toExist;
  });

  test("it loads the buttons ", () => {
    let buttton = component.find("buttton");
    expect(buttton).toExist;
  });

  test("it loads the lyrics div ", () => {
    let Lyrics = component.find("#Lyrics");
    expect(Lyrics).toExist;
  });

  test("it loads the lyrics div ", () => {
    let Lyrics = component.find("#Lyrics");
    expect(Lyrics).toExist;
  });

  test("it displays pause when playing a song ", () => {
    is_playing = true;
    let pauseButton = component.find("#pause");
    expect(pauseButton).toExist;
  });

  test("it displays play when playing a song ", () => {
    is_playing = false;
    let playButton = component.find("#play");
    expect(playButton).toExist;
  });

  test("pauseSong runs", () => {
    component.setState({is_playing: true});
    const instance = component.instance();
    const pauseSong = sinon.spy(instance, "pauseSong");
    const button = component.find("#pause");
    button.simulate("click");
    expect(pauseSong.calledOnce).toBe(true);
  });

  test("skipSong runs", () => {
    component.setState({is_playing: true});
    const instance = component.instance();
    const skipSong = sinon.spy(instance, "skipSong");
    const button = component.find("#skip_button");
    button.simulate("click");
    expect(skipSong.calledOnce).toBe(true);
  });
});

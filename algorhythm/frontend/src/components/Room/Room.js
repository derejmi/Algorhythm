import React from "react";
import CreateRoomPage from "../CreateRoomPage/CreateRoomPage";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import Lyrics from "../Lyrics/Lyrics.js";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.getRoom();
  }

  state = {
    votes_for_skip: 2,
    can_guests_pause: false,
    is_host: false,
    host_email: "",
    showSettings: false,
    spotifyAuthenticated: false,
    song: {},
  };

  code = this.props.match.params.code;

  componentDidMount() {
    this.interval = setInterval(this.getSong, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRoom = () => {
    const url = `/api/get-room?code=${this.code}`;
    fetch(url)
      .then((r) => {
        if (!r.ok) {
          this.props.clearRoom();
          this.props.history.push("/");
        }
        return r.json();
      })
      .then((room) => {
        this.setState({
          votes_for_skip: room.votes_for_skip,
          can_guests_pause: room.can_guests_pause,
          is_host: room.is_host,
          host_email: room.email,
        });
        if (this.state.is_host) {
          this.authenticateSpotify();
          // this.getSong();
        }
        // console.log(this.state.spotifyAuthenticated , "authenticated")
      });
  };

  getSong = () => {
    fetch("/spotify/current-song")
      .then((r) => {
        if (!r.ok) {
          return {};
        } else {
          return r.json();
        }
      })
      .then((songData) => {
        this.setState({ song: songData });
        console.log(songData);
      });
  };

  authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ spotifyAuthenticated: data.status });
        if (!data.status) {
          fetch("/spotify/get-auth")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };

  handleLeaveRoom = (e) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/" },
    };
    fetch("/api/leave-room", options).then((response) => {
      this.props.clearRoom();
      this.props.history.push("/");
    });
  };

  updateShowSettings = (value) => {
    this.setState({
      showSettings: value,
    });
  };

  renderSettings = () => {
    return (
      <div>
        <div>
          <CreateRoomPage
            update={true}
            votes_for_skip={this.state.votes_for_skip}
            can_guests_pause={this.state.can_guests_pause}
            code={this.props.match.params.code}
            updateCallback={this.getRoom}
            history={this.props.history}
          />
        </div>
        <div>
          <button
            className="joinSubmit"
            onClick={() => this.updateShowSettings(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  renderSettingsButton = () => {
    return (
      <button
        className="joinSubmit"
        onClick={() => this.updateShowSettings(true)}
      >
        Settings
      </button>
    );
  };

  render() {
    if (this.state.showSettings) {
      return this.renderSettings();
    }
    // let code = this.props.match.params.code;
    return (
      <div>
        <div id="roomCode">
          <h3>Room: {this.code}</h3>
        </div>

        <div id="musicDiv">
          <MusicPlayer {...this.state.song} />
        </div>

        <div id="twoBtns">
          {this.state.is_host ? this.renderSettingsButton() : null}
          <button className="createSubmit" onClick={this.handleLeaveRoom}>
            Leave Room
          </button>
        </div>

        <Lyrics {...this.state.song} />
      </div>
    );
  }
}

export default Room;

import React from "react";
import CreateRoomPage from "./CreateRoomPage";

class Room extends React.Component {
  state = {
    votes_for_skip: 2,
    can_guests_pause: false,
    is_host: false,
    host_email: "",
    showSettings: false,
    spotifyAuthenticated: false
  };

  code = this.props.match.params.code;
  componentDidMount = () => {
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
          this.authenticateSpotify()
        }
        // console.log(this.state.spotifyAuthenticated , "authenticated")

      });
  }


  authenticateSpotify = () => {
    fetch('/spotify/is-authenticated').then((response) => response.json()).then(data => {
      this.setState({spotifyAuthenticated: data.status});
      if (!data.status) {
        fetch('/spotify/get-auth').then((response) => response.json()).then(data => {
          window.location.replace(data.url)
        })
      }
    })
  }

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
    })
  }

  renderSettings= () => {
    return (
      <div>
      <div>
        <CreateRoomPage update={true} votes_for_skip={this.state.votes_for_skip} can_guests_pause={this.state.can_guests_pause} code={this.props.match.params.code} updateCallback={this.componentDidMount} history={this.props.history}/>
      </div>
      <div>
      <button onClick={() => this.updateShowSettings(false)}>Close</button>
      </div>
    </div>
    )
  }

  renderSettingsButton = () => {
    return (
        <button onClick={() => this.updateShowSettings(true)}>Settings</button>
    )
  }

  render() {
    if (this.state.showSettings) {
      return this.renderSettings()
    }
    // let code = this.props.match.params.code;
    return (
      <div>
        <h1>Room: {this.code}</h1>
        <h2>Votes to skip songs: {this.state.votes_for_skip}</h2>
        <h2>Can Guests Pause: {String(this.state.can_guests_pause)}</h2>
        <h2>Host: {String(this.state.is_host)}</h2>
        <h2>Host Email:{String(this.state.host_email)} </h2>
        {this.state.is_host ? this.renderSettingsButton() : null}
        <button onClick={this.handleLeaveRoom}>Leave Room</button>
      </div>
    );
  }
}

export default Room;

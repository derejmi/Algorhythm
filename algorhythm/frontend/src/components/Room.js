import React from "react";

class Room extends React.Component {
  state = {
    votes_for_skip: 2,
    can_guests_pause: false,
    is_host: false,
    host_email: "",
  };

  code = this.props.match.params.code;

  componentDidMount() {
    const url = `/api/get-room?code=${this.code}`;
    fetch(url)
      .then((r) => r.json())
      .then((room) =>
        this.setState({
          votes_for_skip: room.votes_for_skip,
          can_guests_pause: room.can_guests_pause,
          is_host: room.is_host,
          host_email: room.email,
        })
      );
  }

  handleLeaveRoom = (e) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/" },
    };
    fetch("/api/leave-room")
      .then((response) => {
        console.log(response);
      })
      .then(this.props.history.push("/"));
  };

  render() {
    // let code = this.props.match.params.code;
    return (
      <div>
        <h1>Room: {this.code}</h1>
        <h2>Votes to skip songs: {this.state.votes_for_skip.toString()}</h2>
        <h2>Can Guests Pause: {String(this.state.can_guests_pause)}</h2>
        <h2>Host: {String(this.state.is_host)}</h2>
        <h2>Host Email:{String(this.state.host_email)} </h2>
        <button onClick={this.handleLeaveRoom}>Leave Room</button>
      </div>
    );
  }
}

export default Room;

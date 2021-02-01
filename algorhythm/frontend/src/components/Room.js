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

  render() {
    // let code = this.props.match.params.code;
    return (
      <div>
        <h1>Room - {this.state.code}</h1>
        <p>Votes to skip songs: {this.state.votes_for_skip}</p>
        <p>Can Guests Pause: {String(this.state.can_guests_pause)}</p>
        <p>Host: {String(this.state.is_host)}</p>
        <p>Host Email:{String(this.state.host_email)} </p>
      </div>
    );
  }
}

export default Room;

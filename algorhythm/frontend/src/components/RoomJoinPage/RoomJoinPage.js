import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
      error: "",
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.roomButtonPressed = this.roomButtonPressed.bind(this);
  }

  render() {
    return (
      <div className="mainPage white">
        <div>
          <h1 >Join a Room</h1>
        </div>
        <div>
          <form>
            <label>Enter a Room Code
            <input
              label="Code"
              value={this.state.roomCode}
              helperText={this.state.error}
              onChange={this.handleTextFieldChange}
              error={this.state.error}
            /></label>
          </form>
        </div>
        <div align="center">
          <button id="enter-room" className="createSubmit" onClick={this.roomButtonPressed}>Join Room</button>
        </div>
        <div align="center">
          <Link to="/">
            <button className="joinSubmit">Back</button>
          </Link>
        </div>
      </div>
    );
  }
  handleTextFieldChange(e) {
    this.setState({
      roomCode: e.target.value,
    });
  }
  roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/JSON" },
      body: JSON.stringify({
        code: this.state.roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          this.props.history.push(`/room/${this.state.roomCode}`);
        } else {
          this.setState({ error: "Room not found" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

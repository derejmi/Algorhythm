import React, { Component } from "react";

class CreateRoomPage extends Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      email: "futureproof@gmail.com",
      can_guests_pause: true,
      votes_for_skip: this.defaultVotes,
    };
  }

  handleCanGuestPauseChange = (e) => {
    e.preventDefault();
    this.setState({
      can_guests_pause: e.target.value === "true" ? true : false,
    });
  };

  handleVotesChange = (e) => {
    e.preventDefault();
    this.setState({
      votes_for_skip: e.target.value,
    });
  };

  handleEmail = (e) => {
    e.preventDefault();
    this.setState({
      email: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        votes_for_skip: this.state.votes_for_skip,
        can_guests_pause: this.state.can_guests_pause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push(`/room/${data.code}`));
  };

  goBack = (e) => {
    this.props.history.goBack("/");
  };

  render() {
    return (
      <div>
        <p>This is the create room page</p>

        <form onSubmit={this.handleSubmit}>
          <label>
            Guest Control of Playback State
            <input
              type="radio"
              value="True"
              onChange={this.handleCanGuestPauseChange}
            />{" "}
            True
            <input
              type="radio"
              value="False"
              onChange={this.handleCanGuestPauseChange}
            />{" "}
            False
          </label>
          <br></br>

          <label>
            Votes Required To Skip Song
            <input
              type="number"
              min="1"
              max="4"
              onChange={this.handleVotesChange}
            />
          </label>
          <br></br>

          <label>
            Email
            <input type="text" onChange={this.handleEmail} />
          </label>
          <br></br>

          <input type="submit" value="Create a Room" />
        </form>

        <button onClick={this.goBack}>Back</button>
      </div>
    );
  }
}

export default CreateRoomPage;

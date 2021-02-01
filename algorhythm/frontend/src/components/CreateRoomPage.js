import React, { Component } from "react";
import { BackButton } from './BackButton';

class CreateRoomPage extends Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      can_guests_pause: true,
      votesToSkip: this.defaultVotes
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleCanGuestsPauseChange.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
      
    })
  }

  handleCanGuestsPauseChange(e) {
    this.setState({
      can_guests_pause: e.target.value === 'true' ? true : false,
    })
  }

  handleSubmit() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        can_guests_pause: this.state.CanGuestsPause,
      }),
    };
    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
    <>
    <p>This is the create room page</p>

    <form onSubmit={this.handleSubmit}>

      <label>
        Guest Control of Playback State
        <input type="submit" className="answer" value="True" onClick={this.handleCanGuestsPauseChange}/> <br/>
        <input type="submit" className="answer" value="False" onClick={this.handleCanGuestsPauseChange}/> <br/>
      </label>

      <label>
        Votes Required To Skip Song
        <input type="number" value={this.state.value} onChange={this.handleChange} />
      </label>

        <input type="submit" value="Create a Room" />
    </form>

   <BackButton />
    </>
    )
  }
}

export default CreateRoomPage;
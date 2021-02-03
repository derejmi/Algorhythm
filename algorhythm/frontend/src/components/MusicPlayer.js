import React, { Component } from "react";

class MusicPlayer extends Component {
  render() {
    return (
      <>
        <h1>{this.props.title}</h1>

        <h3>{this.props.artist}</h3>

        {this.props.is_playing ? PAUSEBUTTON : PLAYBUTTON}

        <img src="https://img.icons8.com/clouds/100/000000/play.png" />
        <a href="https://icons8.com/icon/108805/play">Play icon by Icons8</a>
      </>
    );
  }
}

export default MusicPlayer;

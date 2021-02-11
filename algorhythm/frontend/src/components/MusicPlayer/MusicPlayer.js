import React, { Component } from "react";
import { LinearProgress } from "@material-ui/core";

class MusicPlayer extends Component {
  skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    console.log("skip");
    fetch("/spotify/skip", requestOptions);
  }

  pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  }

  playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  }

  // getLyrics =() => {
  //   fetch('https://api.lyrics.ovh/v1/artist/title')
  // }

  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;
    return (
      <>
        {/* {* <h1>{this.props.title}</h1>

     ≈

        {/* {this.props.is_playing ? PAUSEBUTTON : PLAYBUTTON} */}
        <h2>{this.props.title}</h2>
        <h3>{this.props.artist}</h3>
        <img src={this.props.image_url} height="300px" width="300px" />
        <img id="pause"
          src="https://img.icons8.com/clouds/100/000000/play.png"
          onClick={() => {
            this.props.is_playing ? this.pauseSong() : this.playSong();
          }}
        />
        <img id="skip_button"
          src="https://img.icons8.com/dusk/64/000000/end.png"
          onClick={() => this.skipSong()}
        />{" "}
        <div>
          {this.props.votes} / {this.props.required_votes}
        </div>
        <LinearProgress variant="determinate" value={songProgress} />
      </>
    );
  }
}

export default MusicPlayer;

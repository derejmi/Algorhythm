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
        <div id="media_content">
          <h2>{this.props.title}</h2>
          <h3>{this.props.artist}</h3>
          <img id="artist_img"src={this.props.image_url} />
          <div id="buttons">
            <div
              id="play_pause"
              onClick={() => {
                this.props.is_playing ? this.pauseSong() : this.playSong();
              }}
            >
              {" "}
              {this.props.is_playing ? (
                <img src="https://img.icons8.com/android/24/000000/pause.png" />
              ) : (
                <img src="https://img.icons8.com/android/24/000000/play.png" />
              )}{" "}
              <img
                src="https://img.icons8.com/android/24/000000/end.png"
                onClick={() => this.skipSong()}
              />{" "}
              <div class="votes">{this.props.votes} / {this.props.required_votes}</div>
            </div>
          </div>
          {/*  */}
          <LinearProgress
            color="primary"
            variant="determinate"
            value={songProgress}
          />
        </div>
      </>
    );
  }
}

export default MusicPlayer;

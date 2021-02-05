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
      <div id="musicPlayerPage">
      <section id="titleImg">
        <div id="topItem">
        <div id="titleArtist" className="musicItem">
          <h2>{this.props.title}</h2>

          <h3>{this.props.artist}</h3>
        </div>
        <div id="albumArt" className="musicItem">
          <img src={this.props.image_url} height="220px" width="220px" />
        </div>
        </div>
        </section>

        <div>
          <section id="playPauseVotes">
        <div className="pItem">
        <div
          onClick={() => {
            this.props.is_playing ? this.pauseSong() : this.playSong();
          }}
        >   
        {this.props.is_playing ? <img src="https://img.icons8.com/dusk/64/000000/pause.png" /> : <img src="https://img.icons8.com/dusk/64/000000/play.png" /> }     </div>
        </div>
        

        {/*  */}
          <div className="pItem">
            <img
              src="https://img.icons8.com/dusk/64/000000/end.png"
              onClick={() => this.skipSong()}
            />{" "}
            </div>
            <div id="votes" className="pItem">
              {this.props.votes} / {this.props.required_votes}
          </div>
          </section>
        </div>
{/*  */}
        <LinearProgress variant="determinate" value={songProgress} />
        </div>
      </>
    );
  }
}

export default MusicPlayer;

import React, { Component } from "react";
import { LinearProgress } from "@material-ui/core";

class MusicPlayer extends Component {


  pauseSong() {
    const requestOptions = {
      method: "PUT", 
      headers: { "Content-Type": "application/json"}, 
    }
    fetch("/spotify/pause", requestOptions);
  }

  playSong() {
    const requestOptions = {
      method: "PUT", 
      headers: { "Content-Type": "application/json"}, 
    }
    fetch("/spotify/play", requestOptions);
  }

  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;
    return (
      <>
        {/* {* <h1>{this.props.title}</h1>

     ≈

        {/* {this.props.is_playing ? PAUSEBUTTON : PLAYBUTTON} */}
        <h2>{this.props.title}</h2>
       <h3>{this.props.artist}</h3>
        <img src={this.props.image_url} height="300px" width="300px"/>

        <img src="https://img.icons8.com/clouds/100/000000/play.png" onClick={ () => { this.props.is_playing ? this.pauseSong() : this.playSong() } } />

        <img src="https://img.icons8.com/clouds/100/000000/play.png" />

        <LinearProgress variant="determinate" value={songProgress} />
      </>
    );
  }
}

export default MusicPlayer;

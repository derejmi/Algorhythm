import React from "react";

class Lyrics extends React.Component {
  state = { lyrics: null };

  componentDidUpdate(prevProps) {
    // compare props
    if (this.props.title !== prevProps.title) {
      this.setState({
        artist: this.props.artist,
        title: this.props.title,
      });
      this.interval = setInterval(this.fetchLyrics, 1000);
    }
  }

  fetchLyrics = () => {
    if (this.state.title && this.state.artist) {
      const rawArtist = this.state.artist;
      let artist = rawArtist;
      if (artist.indexOf(",") !== -1) {
        artist = artist.split(",")[0];
      }
      if (artist.indexOf(" ") !== -1) {
        artist = artist.split(" ").join("%20");
      }
      if (artist.indexOf("'") !== -1) {
        artist = artist.split("'").join("%27");
      }

      const rawTitle = this.state.title;
      let title = rawTitle;
      if (title.indexOf(" ") !== -1) {
        title = title.split(" ").join("%20");
      }
      if (title.indexOf(",") !== -1) {
        title = title.split(",").join("%2C");
      }
      if (title.indexOf("'") !== -1) {
        title = title.split("'").join("%27");
      }

      const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          console.log(url, "url");
          console.log(data, "data");
          this.setState({ lyrics: data.lyrics });
          // const lyrics = data["lyrics"];
          // this.setState(lyrics);
        });
    }
  };

  render() {
    return (
      <div id="Lyrics">
        <h1>Lyrics </h1>
        <p>{this.state.lyrics ? this.state.lyrics : "Lyrics Not Available"}</p>
      </div>
    );
  }
}

export default Lyrics;

import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage/HomePage";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <HomePage />
        {/* <h1>Hi</h1> */}
      </div>
    );
  }
}

export default App;

// const appDiv = document.getElementById("app");
// render(<App />, appDiv);

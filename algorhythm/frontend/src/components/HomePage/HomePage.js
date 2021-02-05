import React, { Component } from "react";
import RoomJoinPage from "../RoomJoinPage/RoomJoinPage";
import CreateRoomPage from "../CreateRoomPage/CreateRoomPage";
import Room from "../Room/Room";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
    };
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          code: data.code,
        });
      });
  }

  showHomeContent = () => {
    return (
      <>
      <div className="mainPage">
        <h1 id="algoTitle">Algorhythm</h1>
        <div>
          <Link to="/join">
            <button className="joinSubmit">Join a Room</button>
          </Link>
          <Link to="/create">
            <button className="createSubmit">Create a Room</button>
          </Link>
        </div>
        </div>
      </>
    );
  };

  

  clearRoomData = () => {
    this.setState({
      code: null,
    });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return this.state.code ? (
                <Redirect to={`/room/${this.state.code}`} />
              ) : (
                this.showHomeContent()
              );
            }}
          ></Route>
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/create" component={CreateRoomPage} />
          <Route
            path="/room/:code"
            render={(props) => {
              return (
                <Room
                  {...props}
                  clearRoom={() => {
                    this.clearRoomData();
                  }}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

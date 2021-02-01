import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";


export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      roomCode = "",
      error: ""
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.roomButtonPressed = this.roomButtonPressed.bind(this);
  }

  render() {
    return (
      <Grid container spacing={1} alignItems="center"> 
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
          error={this.state.error}
          label="Code"
          placeholder="enter a room code"
          value={this.state.roomCode}
          helperText={this.state.error}
          variant="outlined"
          onChange={this._handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={12} align='center'>
          <Button variant="contained" color="primary" onClick={this.roomButtonPressed}>
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align='center'>
        <Button variant="contained" color="secondaryl" to="/" component={link}>
            Back
          </Button>
          </Grid>
      </Grid>
    );
  }
  handleTextFieldChange(e) {
    this.setState({
      roomCode: e.target.value
    })
  }
  roomButtonPressed() {
    
  }
}

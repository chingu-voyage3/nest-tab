import React, { Component } from "react";

import CurrentTime from "../Components/CurrentTime";
import AppAreaContainer from "./AppAreaContainer";
import "../styles/App.css";
import "../styles/ToDo.css";
import "../styles/Pomodoro.css";
import "../styles/Shelf.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      bgStyle: {
        backgroundImage: "url('https://source.unsplash.com/collection/137627/"+window.screen.width+"x"+window.screen.height+"')"
      }
    };
  }

  render() {
    return (
      <div className="App" style={this.state.bgStyle}>
        <button className="changeBackground" onClick={this.changeBackground}>
          <i className="fa fa-refresh" aria-hidden="true" />
        </button>
        <CurrentTime />
        <AppAreaContainer />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";

import { getBackgroundImage } from "../Components/Background";
import "../styles/App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      bgStyle: {
        backgroundImage: getBackgroundImage(),
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh"
      }
    };

    this.changeBackground = this.changeBackground.bind(this);
  }

  changeBackground() {
    this.setState({
      bgStyle: {
        ...this.state.bgStyle,
        backgroundImage: getBackgroundImage()
      }
    });
  }

  render() {
    return (
      <div className="App" style={this.state.bgStyle}>
        <button className="changeBackground" onClick={this.changeBackground}>
          <i className="fa fa-refresh" aria-hidden="true" />
        </button>
      </div>
    );
  }
}

export default App;

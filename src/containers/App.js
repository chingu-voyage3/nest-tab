import React, { Component } from "react";

import { getBackgroundImage } from "../Components/Background";
import Bookmark from "../Components/Bookmark";
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
      },
      time: this.formatTime(),
      sidebar: {
        activeApp: "",
        showApp: false
      }
    };

    this.changeBackground = this.changeBackground.bind(this);
    this.switchApp = this.switchApp.bind(this);
  }

  changeBackground() {
    this.setState({
      bgStyle: {
        ...this.state.bgStyle,
        backgroundImage: getBackgroundImage()
      }
    });
  }

  formatTime() {
    const currentDate = new Date();
    const hourString =
      currentDate.getHours() % 12 === 0 ? "12" : currentDate.getHours() % 12;
    const minuteString =
      currentDate.getMinutes() < 10
        ? "0" + currentDate.getMinutes()
        : currentDate.getMinutes();
    const timeString =
      hourString +
      ":" +
      minuteString +
      (currentDate.getHours() >= 12 ? " PM" : " AM");

    return timeString;
  }

  tick() {
    this.setState({
      time: this.formatTime()
    });
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  switchApp(e) {
    let showApp = true;
    let activeApp = e.target.id;

    // reset active class on icons
    const appButton = document.querySelectorAll(".appButton");
    for (let i = 0; i < appButton.length; i++) {
      if (appButton[i].classList.contains("active")) {
        appButton[i].classList.remove("active");
      }
    }

    // add active class to icon of current activeApp
    e.target.classList.add("active");

    // closing the the app
    if (e.target.id === this.state.sidebar.activeApp) {
      showApp = false;
      activeApp = "";
      e.target.classList.remove("active");
    }

    this.setState({
      sidebar: {
        ...this.state.sidebar,
        activeApp,
        showApp
      }
    });
  }

  activeApp() {
    let app = "";
    switch (this.state.sidebar.activeApp) {
      case "BookmarkApp":
        app = <Bookmark />;
        break;
      default:
        break;
    }
    return app;
  }

  render() {
    return (
      <div className="App" style={this.state.bgStyle}>
        <button className="changeBackground" onClick={this.changeBackground}>
          <i className="fa fa-refresh" aria-hidden="true" />
        </button>
        <div className="time">{this.state.time}</div>
        <div className="appButtons">
          <ul>
            <li>
              <i
                id="TodoApp"
                className="appButton fa fa-list-alt"
                aria-hidden="true"
                onClick={this.switchApp}
              />
              <p>Todos</p>
            </li>
            <li>
              <i
                id="BookmarkApp"
                className="appButton fa fa-bookmark"
                aria-hidden="true"
                onClick={this.switchApp}
              />
              <p>Bookmark</p>
            </li>
          </ul>
        </div>
        <div
          className="sidebar"
          style={
            this.state.sidebar.showApp ? { right: "0px" } : { right: "-400px" }
          }
        >
          {this.activeApp()}
        </div>
      </div>
    );
  }
}

export default App;

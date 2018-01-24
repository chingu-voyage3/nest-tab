import React, { Component } from "react";

import { getBackgroundImage } from "../Components/Background";
import AppIconContainer from "./AppIconContainer";
import CurrentTime from "../Components/CurrentTime";
import Bookmark from "../Components/Bookmark";
import TodoApp from "../Components/To-Do";
import Pomodoro from "../Components/Pomodoro";
import Shelf from "../Components/Shelf";
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
      },
      sidebar: {
        activeApp: "",
        showApp: false
      }
    };

    this.switchApp = this.switchApp.bind(this);
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

    // add active class to appButton icon of current activeApp
    e.target.classList.add("active");

    // reset, closing the app
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
    // add your component here in this switch case & import your component above
    // NOTE: add li in the .appButtons section, see reference below .appButtons section
    switch (this.state.sidebar.activeApp) {
      case "BookmarkApp":
        app = <Bookmark />;
        break;
      case "TodoApp":
        app = <TodoApp />;
        break;
      case "Pomodoro":
        app = <Pomodoro />;
        break;
      case "Shelf":
        app = <Shelf />;
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
        <CurrentTime />
        <AppIconContainer />
        {/* <div className="appButtons">
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
            <li>
              <i
                id="Pomodoro"
                className="appButton fa fa-clock-o"
                aria-hidden="true"
                onClick={this.switchApp}
              />
              <p>Pomodoro</p>
            </li>
            <li>
              <i
                id="Shelf"
                className="appButton fa fa-list"
                aria-hidden="true"
                onClick={this.switchApp}
              />
              <p>Shelf</p>
            </li>
          </ul>
        </div> */}
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

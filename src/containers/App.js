import React, { Component } from "react";

import CurrentTime from "../Components/CurrentTime";
import AppAreaContainer from "./AppAreaContainer";
import "../styles/App.css";
import "../styles/ToDo.css";
import "../styles/Pomodoro.css";
import "../styles/Shelf.css";
import defaultBackground from "../assets/wallpapers/background-1.jpg";

class App extends Component {
  constructor() {
    super();

    this.state = {
      fetchedImage: null
    };

    this.fetchImage = this.fetchImage.bind(this);
  }

  fetchImage() {
    const imageUrl = "https://source.unsplash.com/collection/137627/"+window.screen.width+"x"+window.screen.height;

    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        this.setState({
          fetchedImage: URL.createObjectURL(blob)
        }, () => console.log(this.state.fetchedImage))
      })
  }

  componentDidMount() {
    this.fetchImage();
  }

  render() {
    const background = {
      backgroundImage: 
          this.state.fetchedImage ? 
          "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url('"+this.state.fetchedImage+"')"
          :  "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url('"+defaultBackground+"')"
    }
    return (
      <div className="App" style={background}>
        <button className="changeBackground" onClick={this.fetchImage}>
          <i className="fa fa-refresh" aria-hidden="true" />
        </button>
        <CurrentTime />
        <AppAreaContainer />
      </div>
    );
  }
}

export default App;

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
    this.changeBg = this.changeBg.bind(this);
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

  changeBg(event) {
    this.fetchImage();
    console.log(event.target);
    event.target.classList.toggle("roll");
  }

  componentDidMount() {
    this.fetchImage();
  }

  render() {
    const background = {
      backgroundImage: 
          this.state.fetchedImage ? 
          "url('"+this.state.fetchedImage+"')"
          :  "url('"+defaultBackground+"')"
    }
    return (
      <div className="App" style={background}>
        <button className="changeBackground" title="Change background image">
          <i className="material-icons" onClick={this.changeBg}>camera</i>
        </button>
        <CurrentTime />
        <AppAreaContainer />
      </div>
    );
  }
}

export default App;

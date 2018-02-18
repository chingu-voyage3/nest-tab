import React, { Component } from "react";

import CurrentTime from "../Components/CurrentTime";
import AppAreaContainer from "./AppAreaContainer";
import image2base64 from "../utils/imageToBase64";
import "../styles/App.css";
import "../styles/ToDo.css";
import "../styles/Pomodoro.css";
import "../styles/Shelf.css";

let defaultImageUrl = "";

class App extends Component {
  constructor() {
    super();

    this.state = {
      fetchedImage: null
    };

    this.fetchImage = this.fetchImage.bind(this);
    this.manageLocalImage = this.manageLocalImage.bind(this);
    this.changeBg = this.changeBg.bind(this);
  }

  fetchImage() {
    const imageUrl = "https://source.unsplash.com/collection/137627/"+window.screen.width+"x"+window.screen.height;

    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        this.setState({
          fetchedImage: URL.createObjectURL(blob)
        }, () => (
          image2base64(imageUrl)
            .then(response => localStorage.setItem("bgImage", response))
            .catch(error => console.log(error))
        ))
      })
  }

  manageLocalImage() {
    if (localStorage['bgImage']) {    
      defaultImageUrl = "data:image/png;base64,"+localStorage["bgImage"];
    } else {
      image2base64("https://source.unsplash.com/random/1366x768")
          .then(response => {
            localStorage.setItem("bgImage", response);
            defaultImageUrl = "data:image/png;base64,"+localStorage["bgImage"];
            this.setState({
              fetchedImage: defaultImageUrl
            })
          })
    }
  }

  changeBg(event) {
    this.fetchImage();
    event.target.classList.toggle("roll");
  }

  componentWillMount() {
    this.manageLocalImage();
  }

  render() {
    const background = {
      backgroundImage: 
          this.state.fetchedImage ? 
          "url('"+this.state.fetchedImage+"')" : "url('"+defaultImageUrl+"')"
    }
    return (
      <div className="App" style={background}>
        <button className="changeBackground" title="Get a new background image">
          <i className="material-icons" onClick={this.changeBg}>camera</i>
        </button>
        <CurrentTime changeBg={this.fetchImage}/>
        <AppAreaContainer />
      </div>
    );
  }
}

export default App;

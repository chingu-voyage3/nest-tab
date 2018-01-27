import React, { Component } from 'react';
import DayInfo from "../Components/DayInfo";
import "../styles/DayInfoContainer.css";
const fetchJsonp = require('fetch-jsonp');
let weather;

class DayInfoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherFetched: false
        }

        this.fetchWeather = this.fetchWeather.bind(this);
    }

    fetchWeather() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(location => {
                let lat = location.coords.latitude;
                let lon = location.coords.longitude;
    
                let weatherApiKey = "a3219d4e2772db6e34c6491e62144b27";
                let weatherApiCall = "https://api.darksky.net/forecast/"+weatherApiKey+"/"+lat+","+lon+"?units=si";
    
                fetchJsonp(weatherApiCall).then( response => response.json())
                .then( data => {
                    weather = data;
                    console.log(data);
                    this.setState({
                        weatherFetched: true
                    })
                });
            })
        }
    }

    componentDidMount() {
        this.fetchWeather();
    }

    render() {
        return(
            <div className={this.props.showHide}>
                <DayInfo weather={this.state.weatherFetched ? weather : ""} />
            </div>
        )
    }
}

export default DayInfoContainer;
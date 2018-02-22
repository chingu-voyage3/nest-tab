import React, { Component } from 'react';
import DayInfo from "../Components/DayInfo";
import SearchBox from "../Components/SearchBox";
import "../styles/DayInfoContainer.css";

const fetchJsonp = require('fetch-jsonp'); //import jsonp module

let weather;

class DayInfoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherFetched: false
        }

        this.fetchWeather = this.fetchWeather.bind(this);
    }

    //Fetch weather data based on current latitude and longitude
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
                    this.setState({
                        weatherFetched: true
                    })
                });
            })
        }
    }

    //Atemp to pull weather data after the component is mounted
    componentDidMount() {
        this.fetchWeather();
    }

    render() {
        return(
            <div className={this.props.showHide}>
                <DayInfo weather={this.state.weatherFetched ? weather : ""} name={JSON.parse(localStorage['name'])}/>
                <SearchBox />
            </div>
        )
    }
}

export default DayInfoContainer;
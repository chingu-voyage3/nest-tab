import React from 'react';

function DisplayWeather(props) {
    return (
        props.weather ? <p>It's {props.weather.currently.summary} outside with a temprature of {props.weather.currently.temperature}°C</p> : ""
    );
}

export default DisplayWeather;
import React from 'react';
import { currentWeekday } from "../utils/currentWeekday";

function DayInfo(props) {
    const day = currentWeekday(new Date());
    const weatherInfo = props.weather ? " It's "+props.weather.currently.summary+" outside with a temprature of " +props.weather.currently.temperature.toFixed(1)+"°C" : "";
    return(
        <div className="daySummary">
            <h1>Hi, {props.name}!</h1>
            <p>This is an amazing <strong>{day}</strong>!
            {weatherInfo}<br/>
            What will you accomplish today? :)</p>
        </div>
    );
}

export default DayInfo;
import React from 'react';
import { currentWeekday } from "../utils/currentWeekday";

function DayInfo(props) {
    const day = currentWeekday(new Date());
    const weatherInfo = props.weather ? " It's "+props.weather.currently.summary+" outside with a temprature of " +props.weather.currently.temperature+"°C" : "";
    return(
        <p className="daySummary">This is an amazing <strong>{day}</strong>!
        {weatherInfo}<br/>
        What will you accomplish today? :)</p>
    );
}

export default DayInfo;
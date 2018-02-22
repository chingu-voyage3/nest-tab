import React from 'react';
import { currentWeekday } from "../utils/currentWeekday";

//Generate and renders text for day information section
function DayInfo(props) {
    const day = currentWeekday(new Date());

    //Structures weather text
    const weatherInfo = props.weather ? " It's "+props.weather.currently.summary+" outside with a temperature of " +props.weather.currently.temperature.toFixed(1)+"°C" : "";
    const timeOfDay = new Date().getHours();

    //Decide greeting based on time of the day
    let greeting = "Hi";
    switch(true) {
        case (timeOfDay >= 0 && timeOfDay < 12 ):
            greeting = "Good Morning";
            break;
        case (timeOfDay >= 12 && timeOfDay < 16):
            greeting = "Good Noon";
            break;
        case (timeOfDay >= 16 && timeOfDay < 18):
            greeting = "Good Afternoon"
            break;
        case (timeOfDay >= 18 && timeOfDay < 25):
            greeting = "Good Evening"
            break;
        default:
            greeting = "Hi";
            break;
    }

    return(
        <div className="daySummary">
            <h1>{greeting}, {props.name}!</h1>
            <p>This is an amazing <strong>{day}</strong>!
            {weatherInfo}<br/>
            What will you accomplish today? :)</p>
        </div>
    );
}

export default DayInfo;
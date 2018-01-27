import React from 'react';
import { currentWeekday } from "../utils/currentWeekday";

function DayInfo() {
    const day = currentWeekday(new Date());

    return(
        <p>This is an amazing <strong>{day}</strong>! What will you accomplish today? :)</p>
    );
}

export default DayInfo;
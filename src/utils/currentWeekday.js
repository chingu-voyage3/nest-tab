//Takes a date and returns the weekday

export function currentWeekday(date) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return weekdays[date.getDay()];
}
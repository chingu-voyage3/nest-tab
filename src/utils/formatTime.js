export function formatTime() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours() % 12 === "0" ? "12" : currentDate.getHours() % 12;
    const currentMinute = 
        currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes();
    const ampm = currentDate.getHours() >= 12 ? "PM" : "AM";
    const formattedTime = currentHour + " : " + currentMinute + " " + ampm;

    return formattedTime;
}
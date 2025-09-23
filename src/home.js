import { getWeather } from "./weather";
import { icons } from "./svgIcons";
import { format } from "date-fns";

// const mainDiv = document.getElementById("main");

export async function updateDisplay(cityName) {
    const homeDiv = document.getElementById("home");
    homeDiv.innerHTML = "";
    const result = await getWeather(cityName);
    console.log(result);
    const currTime = result.currentConditions.datetime;
    // const sunsetTime = result.currentConditions.sunset;
    // const sunriseTime = result.currentConditions.sunrise;

    // if (currTime > sunsetTime || currTime < sunriseTime) {
    //     mainDiv.classList.add("night-theme");
    //     mainDiv.classList.remove("day-theme");
    // } else {
    //     mainDiv.classList.add("day-theme");
    //     mainDiv.classList.remove("night-theme");
    // }

    const headingDiv = document.createElement("div");

    const citySubHeading = document.createElement("h2");
    citySubHeading.classList.add("sub-heading");
    citySubHeading.innerText = result.resolvedAddress;


    const tempHeading = document.createElement("h1");
    tempHeading.classList.add("heading");
    tempHeading.innerText = result.currentConditions.temp + "°";

    const conditionSubHeading = document.createElement("h2");
    conditionSubHeading.classList.add("sub-heading", "info");
    conditionSubHeading.innerText = result.currentConditions.conditions;

    const highLowSubHeading = document.createElement("h2");
    highLowSubHeading.classList.add("sub-heading");
    highLowSubHeading.innerText = `H: ${result.days[0].tempmax}° L: ${result.days[0].tempmin}°`;

    headingDiv.appendChild(citySubHeading);
    headingDiv.appendChild(tempHeading);
    headingDiv.appendChild(conditionSubHeading);
    headingDiv.appendChild(highLowSubHeading);

    homeDiv.appendChild(headingDiv);

    const componentsDiv = document.createElement("div");

    const day1 = result.days[0]
    const day2 = result.days[1]
    const days = [day1, day2]
    const hoursForecastDiv = document.createElement("div");
    hoursForecastDiv.classList.add("flex-container", "card");
    const hoursDiv = document.createElement("div");
    hoursDiv.classList.add("flex-container", "flex-container-horizontal", "hours-forecast");
    const hoursForecastSubHeading = document.createElement("h2");
    hoursForecastSubHeading.classList.add("sub-heading", "info");
    hoursForecastSubHeading.innerText = "24 Hour Forecast";

    let count = 0;
    let dayCount = 0;

    for (const day of days) {
        dayCount++;
        for (const hour of day.hours) {
            if ((dayCount < 2 && hour.datetime > currTime && count < 24) || (dayCount > 1 && count < 24)) {
                const hourDiv = document.createElement("div");
                hourDiv.classList.add("flex-container");
                const hourTimeDiv = document.createElement("div");
                const hourIconDiv = document.createElement("div");
                const hourTempDiv = document.createElement("div");

                if (count == 0) {
                    hourTimeDiv.innerText = "Now";
                    hourTimeDiv.style.fontWeight = 700;
                    hourIconDiv.innerHTML = icons[result.currentConditions.icon];
                    hourTempDiv.innerHTML = result.currentConditions.temp + "°";
                } else {

                    const date = new Date(`2025-01-01T${hour.datetime}`);
                    const hourTime = format(date, "h a");
                    hourTimeDiv.innerText = hourTime;

                    hourIconDiv.innerHTML = icons[hour.icon];
                    hourTempDiv.innerText = hour.temp + "°";
                }

                hourDiv.appendChild(hourTimeDiv);
                hourDiv.appendChild(hourIconDiv);
                hourDiv.appendChild(hourTempDiv);
                hoursDiv.appendChild(hourDiv);

                count++;
            }
        }
    }

    hoursForecastDiv.appendChild(hoursForecastSubHeading);
    hoursForecastDiv.appendChild(hoursDiv);
    componentsDiv.appendChild(hoursForecastDiv);
    homeDiv.appendChild(componentsDiv);
}
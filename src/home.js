import { getWeather } from "./weather";
import { icons } from "./svgIcons";
import { format } from "date-fns";
import rainGif from "./rain.gif";

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
    componentsDiv.classList.add("components");
    homeDiv.appendChild(componentsDiv);

    const day1 = result.days[0]
    const day2 = result.days[1]
    const days = [day1, day2]
    const hoursForecastDiv = document.createElement("div");
    hoursForecastDiv.classList.add("flex-container", "card", "hourly-forecast");
    const hoursDiv = document.createElement("div");
    hoursDiv.classList.add("flex-container", "flex-container-horizontal", "hours");
    const hoursForecastSubHeading = document.createElement("span");
    hoursForecastSubHeading.classList.add("sub-heading-card", "info");
    hoursForecastSubHeading.innerText = "24 Hour Forecast";

    let hoursCount = 0;
    let dayCount = 0;
    let isCurrHour = true;

    for (const day of days) {
        dayCount++;
        for (const hour of day.hours) {
            if ((dayCount < 2 && hour.datetime > currTime && hoursCount < 24)
                || (dayCount > 1 && hoursCount < 24)) {
                const hourDiv = document.createElement("div");
                hourDiv.classList.add("flex-container");
                const hourTimeDiv = document.createElement("div");
                const hourIconImg = document.createElement("img");
                const hourTempDiv = document.createElement("div");

                if (isCurrHour) {
                    hourTimeDiv.innerText = "Now";
                    hourTimeDiv.style.fontWeight = 700;
                    hourIconImg.src = icons[result.currentConditions.icon];
                    hourTempDiv.innerHTML = result.currentConditions.temp + "°";
                    isCurrHour = false;
                } else {

                    const date = new Date(`2025-01-01T${hour.datetime}`);
                    const hourTime = format(date, "h a");
                    hourTimeDiv.innerText = hourTime;

                    hourIconImg.src = icons[hour.icon];
                    hourTempDiv.innerText = hour.temp + "°";
                    hoursCount++;
                }

                hourDiv.appendChild(hourTimeDiv);
                hourDiv.appendChild(hourIconImg);
                hourDiv.appendChild(hourTempDiv);
                hoursDiv.appendChild(hourDiv);
            }
        }
    }

    hoursForecastDiv.appendChild(hoursForecastSubHeading);
    hoursForecastDiv.appendChild(hoursDiv);
    componentsDiv.appendChild(hoursForecastDiv);

    const daysForecastDiv = document.createElement("div");
    daysForecastDiv.classList.add("card", "days-forecast");
    const daysForecastSubHeading = document.createElement("span");
    daysForecastSubHeading.classList.add("sub-heading-card", "info");
    daysForecastSubHeading.innerText = "7-Day Forecast";

    daysForecastDiv.appendChild(daysForecastSubHeading);

    for (let i = 0; i < 7; i++) {
        const currDay = result.days[i];
        const currDate = new Date(currDay.datetime);
        const currDayName = format(currDate, "EEEE");

        const dayNameDiv = document.createElement("div");
        dayNameDiv.innerText = currDayName;

        const dayImg = document.createElement("img");
        dayImg.src = icons[currDay.icon];

        const dayForecastDiv = document.createElement("div");
        dayForecastDiv.classList.add("grid-container");

        const dayTempMaxDiv = document.createElement("div");
        const dayTempMaxValDiv = document.createElement("div");
        dayTempMaxValDiv.innerText = currDay.tempmax + "°";
        dayTempMaxDiv.appendChild(dayTempMaxValDiv);

        const dayTempMinDiv = document.createElement("div");
        const dayTempMinValDiv = document.createElement("div");
        dayTempMinValDiv.innerText = currDay.tempmin + "°";
        dayTempMinDiv.appendChild(dayTempMinValDiv);

        dayForecastDiv.appendChild(dayNameDiv);
        dayForecastDiv.appendChild(dayImg);
        dayForecastDiv.appendChild(dayTempMaxDiv);
        dayForecastDiv.appendChild(dayTempMinDiv);

        daysForecastDiv.appendChild(dayForecastDiv);
    }

    componentsDiv.appendChild(daysForecastDiv);

    const weatherGif = document.createElement("img");
    weatherGif.classList.add("card", "gif");
    weatherGif.src = rainGif;
    componentsDiv.appendChild(weatherGif);

}
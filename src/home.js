import { getWeather } from "./weather";
import { icons } from "./svgIcons";
import { format } from "date-fns";

import night from "./night.jpg"
import day from "./day.jpg"

// const mainDiv = document.getElementById("main");

export async function updateDisplay(cityName) {

    const homeDiv = document.getElementById("home");
    homeDiv.innerHTML = "";

    const result = await getWeather(cityName);

    const mainDiv = document.getElementById("main");
    const currTime = result.currentConditions.datetime;
    const sunsetTime = result.currentConditions.sunset;
    const sunriseTime = result.currentConditions.sunrise;

    if (currTime > sunsetTime || currTime < sunriseTime) {
        mainDiv.classList.add("night-theme");
        mainDiv.classList.remove("day-theme");
        mainDiv.style.backgroundImage = `url(${night})`;
    } else {
        mainDiv.classList.add("day-theme");
        mainDiv.classList.remove("night-theme");
        mainDiv.style.backgroundImage = `url(${day})`;
    }

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
        if (i == 0) dayNameDiv.innerText = "Today";
        else dayNameDiv.innerText = currDayName;

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

    const sunsetCardDiv = document.createElement("div");
    sunsetCardDiv.classList.add("card", "flex-container", "sunset-card");

    const sunsetCardHeading = document.createElement("span");
    sunsetCardHeading.classList.add("subheading-card", "info");
    sunsetCardHeading.innerText = "Sunset";

    const sunsetCardContentDiv = document.createElement("div");
    sunsetCardContentDiv.classList.add("card-content");
    const sunsetDateTime = new Date(`2025-01-01T${day1.sunset}`);
    const sunsetTimeFmt = format(sunsetDateTime, "h:mm a");
    sunsetCardContentDiv.innerText = sunsetTimeFmt;

    sunsetCardDiv.appendChild(sunsetCardHeading);
    sunsetCardDiv.appendChild(sunsetCardContentDiv);

    componentsDiv.appendChild(sunsetCardDiv);

    const sunriseCardDiv = document.createElement("div");
    sunriseCardDiv.classList.add("card", "flex-container", "sunrise-card");

    const sunriseCardHeading = document.createElement("span");
    sunriseCardHeading.classList.add("subheading-card", "info");
    sunriseCardHeading.innerText = "Sunrise";

    const sunriseCardContentDiv = document.createElement("div");
    sunriseCardContentDiv.classList.add("card-content");
    const sunriseDateTime = new Date(`2025-01-01T${day1.sunrise}`);
    const sunriseTimeFmt = format(sunriseDateTime, "h:mm a");
    sunriseCardContentDiv.innerText = sunriseTimeFmt;

    sunriseCardDiv.appendChild(sunriseCardHeading);
    sunriseCardDiv.appendChild(sunriseCardContentDiv);

    componentsDiv.appendChild(sunriseCardDiv);

    const feelslikeCardDiv = document.createElement("div");
    feelslikeCardDiv.classList.add("card", "flex-container", "feelslike-card");

    const feelslikeCardHeading = document.createElement("span");
    feelslikeCardHeading.classList.add("subheading-card", "info");
    feelslikeCardHeading.innerText = "Feels Like";

    const feelslikeCardContentDiv = document.createElement("div");
    feelslikeCardContentDiv.classList.add("card-content");
    feelslikeCardContentDiv.innerText = result.currentConditions.feelslike + "°";

    feelslikeCardDiv.appendChild(feelslikeCardHeading);
    feelslikeCardDiv.appendChild(feelslikeCardContentDiv);

    componentsDiv.appendChild(feelslikeCardDiv);

    const humidityCardDiv = document.createElement("div");
    humidityCardDiv.classList.add("card", "flex-container", "humidity-card");

    const humidityCardHeading = document.createElement("span");
    humidityCardHeading.classList.add("subheading-card", "info");
    humidityCardHeading.innerText = "Humidity";

    const humidityCardContentDiv = document.createElement("div");
    humidityCardContentDiv.classList.add("card-content");
    humidityCardContentDiv.innerText = result.currentConditions.humidity + "%";

    humidityCardDiv.appendChild(humidityCardHeading);
    humidityCardDiv.appendChild(humidityCardContentDiv);

    componentsDiv.appendChild(humidityCardDiv);

    const pressureCardDiv = document.createElement("div");
    pressureCardDiv.classList.add("card", "flex-container", "pressure-card");

    const pressureCardHeading = document.createElement("span");
    pressureCardHeading.classList.add("subheading-card", "info");
    pressureCardHeading.innerText = "Pressure";

    const pressureCardContentDiv = document.createElement("div");
    pressureCardContentDiv.classList.add("card-content");
    pressureCardContentDiv.innerText = result.currentConditions.pressure + " hPa";

    pressureCardDiv.appendChild(pressureCardHeading);
    pressureCardDiv.appendChild(pressureCardContentDiv);

    componentsDiv.appendChild(pressureCardDiv);

    const visibilityCardDiv = document.createElement("div");
    visibilityCardDiv.classList.add("card", "flex-container", "visibility-card");

    const visibilityCardHeading = document.createElement("span");
    visibilityCardHeading.classList.add("subheading-card", "info");
    visibilityCardHeading.innerText = "Visibility";

    const visibilityCardContentDiv = document.createElement("div");
    visibilityCardContentDiv.classList.add("card-content");
    visibilityCardContentDiv.innerText = result.currentConditions.visibility + " km";

    visibilityCardDiv.appendChild(visibilityCardHeading);
    visibilityCardDiv.appendChild(visibilityCardContentDiv);

    componentsDiv.appendChild(visibilityCardDiv);
}
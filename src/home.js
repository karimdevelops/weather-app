import { getWeather } from "./weather";

const mainDiv = document.getElementById("main");

export async function updateDisplay(cityName) {
    const homeDiv = document.getElementById("home");
    homeDiv.innerHTML = "";
    const result = await getWeather(cityName);
    console.log(result);
    const currTime = result.currentConditions.datetime;
    const sunsetTime = result.currentConditions.sunset;
    const sunriseTime = result.currentConditions.sunrise;

    if (currTime > sunsetTime || currTime < sunriseTime) {
        mainDiv.classList.add("night-theme");
        mainDiv.classList.remove("day-theme");
    } else {
        mainDiv.classList.add("day-theme");
        mainDiv.classList.remove("night-theme");
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
}
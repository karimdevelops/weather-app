import { getWeather } from "./weather";

const mainDiv = document.getElementById("main");

export async function updateDisplay(cityName) {
    // --main - bg - color: ;
    const homeDiv = document.getElementById("home");
    homeDiv.innerHTML = "";
    const result = await getWeather(cityName);
    console.log(result);
    const currTime = result.currentConditions.datetime;
    const sunsetTime = result.currentConditions.sunset;
    const sunriseTime = result.currentConditions.sunrise;

    if (currTime > sunsetTime || currTime < sunriseTime) {
        mainDiv.style.color = "#f5f5f5"
        mainDiv.style.backgroundColor = "#020111";
    } else {
        mainDiv.style.color = "#162A33"
        mainDiv.style.backgroundColor = "#82C8E5";
    }

    const headingDiv = document.createElement("div");

    const citySubHeading = document.createElement("h2");
    citySubHeading.classList.add("sub-heading");
    citySubHeading.innerText = result.resolvedAddress;


    const tempHeading = document.createElement("h1");
    tempHeading.classList.add("heading");
    tempHeading.innerText = result.currentConditions.temp + "°";

    const conditionSubHeading = document.createElement("h2");
    conditionSubHeading.classList.add("sub-heading");
    conditionSubHeading.style.color = "#969699";
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
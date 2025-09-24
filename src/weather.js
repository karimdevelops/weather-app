import { loading } from "./svgIcons";

export async function getWeather(cityName) {
    const homeDiv = document.getElementById("home");
    homeDiv.innerHTML = loading;

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=K6ZZ56DKPXKJKQ2FR5VXBFPEP&contentType=json`);

    const result = await response.json();
    return result;
}

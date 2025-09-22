import "./style.css";

const form = document.getElementById("form");
const formInput = document.getElementById("formInput");

form.addEventListener("submit", (e) => {
    const placeName = formInput.value;
    console.log(getWeather(placeName));
    formInput.value = "";
    e.preventDefault();
})

async function getWeather(placeName) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${placeName}?unitGroup=metric&key=K6ZZ56DKPXKJKQ2FR5VXBFPEP&contentType=json`);

    const result = await response.json();
    return result;
}
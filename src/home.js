import { getWeather } from "./weather";

const homeDiv = document.getElementById("home");

const result = await getWeather();
console.log(result);

const headingDiv = document.createElement("div");

const citySubHeading = document.createElement("h2");
citySubHeading.classList.add("sub-heading");
citySubHeading.innerText = result.resolvedAddress;


const tempHeading = document.createElement("h1");
tempHeading.classList.add("heading");
tempHeading.innerText = result.currentConditions.temp;

const conditionSubHeading = document.createElement("h2");
conditionSubHeading.classList.add("sub-heading");
conditionSubHeading.style.color = "#808080";
conditionSubHeading.innerText = result.currentConditions.conditions;

const highLowSubHeading = document.createElement("h2");
highLowSubHeading.classList.add("sub-heading");
highLowSubHeading.innerText = `H:${result.days[0].tempmax} L:${result.days[0].tempmin}`;

headingDiv.appendChild(citySubHeading);
headingDiv.appendChild(tempHeading);
headingDiv.appendChild(conditionSubHeading);
headingDiv.appendChild(highLowSubHeading);

homeDiv.appendChild(headingDiv);
import "./style.css";
import "./home"
import { updateDisplay } from "./home";

fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        getCity(data.ip);
    })
    .catch(error => console.error("Error fetching IP:", error));

async function getCity(ip) {
    fetch(`https://ipapi.co/${ip}/json/`)
        .then(res => res.json())
        .then(data => (updateDisplay(data.city)));
}

const form = document.getElementById("form");
const formInput = document.getElementById("formInput");
form.addEventListener("submit", (e) => {
    const cityName = formInput.value;
    updateDisplay(cityName);
    formInput.value = "";
    e.preventDefault();
})
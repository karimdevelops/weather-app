import "./style.css";
import "./home"
import { updateDisplay } from "./home";

updateDisplay("Dubai");

const form = document.getElementById("form");
const formInput = document.getElementById("formInput");
form.addEventListener("submit", (e) => {
    const cityName = formInput.value;
    updateDisplay(cityName);
    formInput.value = "";
    e.preventDefault();
})
import { getCurrentWeather } from "./services/weatherService.js";

/* ===============================
   AUTH CHECK
================================= */

const userEmail = localStorage.getItem("userEmail");

if (!userEmail) {
  window.location.href = "index.html";
}

/* ===============================
   WELCOME MESSAGE
================================= */

const welcomeMessage = document.getElementById("welcomeMessage");

if (welcomeMessage) {
  welcomeMessage.textContent = `Logged in as: ${userEmail}`;
}

/* ===============================
   WEATHER MODULE
================================= */

const weatherInfo = document.getElementById("weatherInfo");

async function loadWeather() {
  const weather = await getCurrentWeather();

  if (!weather) {
    weatherInfo.textContent = "Unable to load weather data.";
    return;
  }

  weatherInfo.innerHTML = `
    Temperature: ${weather.temperature}°C <br>
    Wind Speed: ${weather.windspeed} km/h <br>
    Time: ${weather.time}
  `;
}

loadWeather();
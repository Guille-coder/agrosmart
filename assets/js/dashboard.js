import { getCurrentWeather } from "./services/weatherService.js";
function getAnimals() {
  return JSON.parse(localStorage.getItem("animals")) || [];
}

function getInventory() {
  return JSON.parse(localStorage.getItem("agrosmart_inventory")) || [];
}
function renderDashboardKPIs() {
  const animals = getAnimals();
  const inventory = getInventory();

  const totalAnimals = animals.length;
  const totalInventoryItems = inventory.length;
  const totalInventoryQuantity = inventory.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  const kpiContainer = document.getElementById("dashboardKPIs");

  kpiContainer.innerHTML = `
    <div class="kpi-card">
      <h2>${totalAnimals}</h2>
      <span>Total Animals</span>
    </div>

    <div class="kpi-card">
      <h2>${totalInventoryItems}</h2>
      <span>Inventory Items</span>
    </div>

    <div class="kpi-card">
      <h2>${totalInventoryQuantity}</h2>
      <span>Total Units</span>
    </div>
  `;
}
function renderSystemStatus() {
  const animals = getAnimals();
  const inventory = getInventory();

  const statusInfo = document.getElementById("statusInfo");

  let status = "";
  let color = "";

  if (animals.length === 0 && inventory.length === 0) {
    status = "Critical – No operational data.";
    color = "#e53e3e"; 
  } 
  else if (animals.length > 0 && inventory.length > 0) {
    status = "Healthy – All modules operational.";
    color = "#38a169"; 
  } 
  else {
    status = "Warning – Partial system data.";
    color = "#dd6b20"; 
  }

  statusInfo.innerHTML = `
    <span style="color:${color}; font-weight:600;">
      ● ${status}
    </span>
  `;
}
function renderMiniAnimalsChart() {
  const animals = getAnimals();

  const canvas = document.getElementById("miniAnimalsChart");
  if (!canvas) return; 
  const ctx = canvas.getContext("2d");

  const typeMap = {};
  animals.forEach(a => {
    typeMap[a.type] = (typeMap[a.type] || 0) + 1;
  });

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const types = Object.keys(typeMap);
  const values = Object.values(typeMap);

  if (values.length === 0) {
    ctx.fillText("No data available", 120, 100);
    return;
  }

  const max = Math.max(...values);
  const barWidth = 40;
  const gap = 30;
  canvas.width = canvas.offsetWidth;
  canvas.height = 250;

  values.forEach((value, i) => {
    const height = (value / max) * 120;

    const x = i * (barWidth + gap) + 40;
    const y = canvas.height - height - 30;

    ctx.fillStyle = "#2c7a7b";
    ctx.fillRect(x, y, barWidth, height);

    ctx.fillStyle = "#000";
    ctx.fillText(types[i], x + barWidth / 2, canvas.height - 10);
  });
}
function renderInsights() {
  const animals = getAnimals();
  const inventory = getInventory();

  const insightsContainer = document.getElementById("systemInsights");

  if (!insightsContainer) return;

  let insights = [];

  // Animal distribution check
  const typeMap = {};
  animals.forEach(a => {
    typeMap[a.type] = (typeMap[a.type] || 0) + 1;
  });

  const values = Object.values(typeMap);

  if (values.length > 0) {
    const max = Math.max(...values);
    if (max > animals.length * 0.7) {
      insights.push("High concentration in a single animal category.");
    } else {
      insights.push("Livestock distribution appears balanced.");
    }
  }

  // Inventory check
  const totalInventory = inventory.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  if (totalInventory < 10) {
    insights.push("Inventory levels are critically low.");
  } else if (totalInventory < 50) {
    insights.push("Inventory levels are moderate.");
  } else {
    insights.push("Inventory levels are stable.");
  }

  if (animals.length === 0 && inventory.length === 0) {
    insights = ["No operational data available."];
  }

  insightsContainer.innerHTML = insights
    .map(text => `<p>• ${text}</p>`)
    .join("");
}

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
  Time: ${weather.time} <br>
  Wind Direction: ${weather.winddirection}° <br>
  Interval: ${weather.interval} sec <br>
  Daytime: ${weather.is_day ? "Yes" : "No"}
`;
}

function initDashboard() {
  renderDashboardKPIs();
  renderSystemStatus();
  renderMiniAnimalsChart();
  renderInsights();
  loadWeather();
}

/* ===============================
   LIVE DASHBOARD UPDATE
================================= */

window.addEventListener("storage", initDashboard);
window.addEventListener("focus", initDashboard);

initDashboard();
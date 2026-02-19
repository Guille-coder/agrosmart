import { getMarketData } from "./services/marketService.js";

const container = document.getElementById("reportsContainer");

if (!container) {
  console.warn("Reports container not found");
}
function getAnimals() {
  return JSON.parse(localStorage.getItem("animals")) || [];
}

function getInventory() {
  return JSON.parse(localStorage.getItem("agrosmart_inventory")) || [];
}

async function loadReports() {
  container.innerHTML = `<div class="market-loading">Generating analytical report...</div>`;

  const animals = getAnimals();
  const inventory = getInventory();
  const marketData = await getMarketData();

  const wheat = marketData.find(item => item.name === "Wheat");

  //  ANIMAL ANALYTICS
  const totalAnimals = animals.length;

  const animalTypesMap = {};
  animals.forEach(a => {
    animalTypesMap[a.type] = (animalTypesMap[a.type] || 0) + 1;
  });

  const animalTypesCount = Object.keys(animalTypesMap).length;
  const avgAnimalsPerType = animalTypesCount > 0
    ? (totalAnimals / animalTypesCount).toFixed(2)
    : 0;

  //  INVENTORY ANALYTICS
  const totalInventoryItems = inventory.length;

  const totalInventoryQuantity = inventory.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  const avgInventoryPerItem = totalInventoryItems > 0
    ? (totalInventoryQuantity / totalInventoryItems).toFixed(2)
    : 0;

  //  MARKET ANALYTICS
  const avgMarketChange =
    marketData.length > 0
      ? (
          marketData.reduce(
            (sum, item) => sum + Number(item.change),
            0
          ) / marketData.length
        ).toFixed(2)
      : 0;

  container.innerHTML = `
    <div class="reports-grid">

      <div class="report-card">
        <h3>Total Animals</h3>
        <p>${totalAnimals}</p>
      </div>

      <div class="report-card">
        <h3>Animal Types</h3>
        <p>${animalTypesCount}</p>
      </div>

      <div class="report-card">
        <h3>Avg Animals per Type</h3>
        <p>${avgAnimalsPerType}</p>
      </div>

      <div class="report-card">
        <h3>Total Inventory Quantity</h3>
        <p>${totalInventoryQuantity}</p>
      </div>

      <div class="report-card">
        <h3>Avg Inventory per Item</h3>
        <p>${avgInventoryPerItem}</p>
      </div>

      <div class="report-card">
        <h3>Wheat Price</h3>
        <p>$${wheat ? wheat.price : "N/A"}</p>
        <small>${wheat ? wheat.updated : ""}</small>
      </div>

      <div class="report-card">
        <h3>Market Avg Change</h3>
        <p class="${avgMarketChange >= 0 ? "positive" : "negative"}">
          ${avgMarketChange >= 0 ? "▲" : "▼"} ${avgMarketChange}
        </p>
      </div>

    </div>
  `;
}

/* ==============================
   INIT REPORTS
================================= */

loadReports();

/* ===============================
   LIVE UPDATE EVENTS
================================= */

window.addEventListener("storage", loadReports);
window.addEventListener("focus", loadReports);

/* ===============================
   EXPORT PDF
================================= */

document.addEventListener("DOMContentLoaded", () => {
  const exportBtn = document.getElementById("exportPDF");

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      window.print();
    });
  }
});
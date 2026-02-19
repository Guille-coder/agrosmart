import { getMarketData } from "./services/marketService.js";

const marketContainer = document.getElementById("marketInfo");
const ctx = document.getElementById("marketChart");

let chart;
let priceHistory = {
  Wheat: [],
  Corn: [],
  Rice: [],
  Soybeans: []
};

function getMarketHistory() {
  return JSON.parse(localStorage.getItem("agrosmart_market_history")) || [];
}

function saveMarketHistory(history) {
  localStorage.setItem(
    "agrosmart_market_history",
    JSON.stringify(history)
  );
}
async function loadMarket() {
  const data = await getMarketData();

  if (!data || !Array.isArray(data)) {
    marketContainer.innerHTML =
      `<div class="market-error">Unable to load market data.</div>`;
    return;
  }

  /* ===============================
     JSON NORMALIZATION (REQUIREMENT)
  =============================== */

  const marketSnapshot = data.map(item => ({
    name: item.name,
    price: Number(item.price),
    change: Number(item.change),
    timestamp: new Date().toISOString(),
    trend: item.change >= 0 ? "up" : "down",
    volatility: Math.abs(item.change),
    currency: "USD",
    source: "Market API"
  }));

  /* ===============================
     SAVE JSON HISTORY
  =============================== */

  const history = getMarketHistory();
  history.push(...marketSnapshot);

  while (history.length > 50) {
    history.shift();
  }

  saveMarketHistory(history);

  /* ===============================
     RENDER UI
  =============================== */

  marketContainer.innerHTML = `
    <div class="market-grid">
      ${marketSnapshot.map(item => `
        <div class="market-card">
          <h2>${item.name}</h2>
          <p><strong>Price:</strong> $${item.price}</p>
          <p><small>${item.trend.toUpperCase()} trend</small></p>
          <p>
            <span class="${item.change >= 0 ? "positive" : "negative"}">
              ${item.change >= 0 ? "▲" : "▼"} ${item.change}
            </span>
          </p>
        </div>
      `).join("")}
    </div>
  `;

  /* ===============================
     UPDATE CHART FROM JSON
  =============================== */

  marketSnapshot.forEach(item => {
  if (!priceHistory[item.name]) {
    priceHistory[item.name] = [];
  }

  priceHistory[item.name].push(item.price);

  if (priceHistory[item.name].length > 10) {
    priceHistory[item.name].shift();
  }
});
  updateChart();
}
function updateChart() {
  if (!chart) {
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array(10).fill(""),
        datasets: Object.keys(priceHistory).map(name => ({
          label: name,
          data: priceHistory[name],
          fill: false,
          tension: 0.3
        }))
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom"
          }
        },
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  } else {
    chart.data.datasets.forEach(dataset => {
      dataset.data = priceHistory[dataset.label];
    });
    chart.update();
  }
}

// Auto refresh every 30 seconds
loadMarket();
setInterval(loadMarket, 30000);
window.addEventListener("focus", loadMarket);
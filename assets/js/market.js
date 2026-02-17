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

async function loadMarket() {
  const data = await getMarketData();

  if (!data) {
    marketContainer.innerHTML =
      `<div class="market-error">Unable to load market data.</div>`;
    return;
  }

  // Render cards
  marketContainer.innerHTML = `
    <div class="market-grid">
      ${data.map(item => `
        <div class="market-card">
          <h2>${item.name}</h2>
          <p><strong>Price:</strong> $${item.price}</p>
          <p>
            <span class="${item.change >= 0 ? "positive" : "negative"}">
              ${item.change >= 0 ? "▲" : "▼"} ${item.change}
            </span>
          </p>
        </div>
      `).join("")}
    </div>
  `;

  // Update price history
  data.forEach(item => {
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
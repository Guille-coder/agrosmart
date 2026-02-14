import { getExchangeRate } from "./services/marketService.js";

/* ===============================
   AUTH CHECK
================================= */

const userEmail = localStorage.getItem("userEmail");

if (!userEmail) {
  window.location.href = "index.html";
}

/* ===============================
   LOAD EXCHANGE DATA
================================= */

const exchangeInfo = document.getElementById("exchangeInfo");

async function loadExchangeRate() {
  const rate = await getExchangeRate();

  if (!rate) {
    exchangeInfo.textContent = "Unable to load exchange rate.";
    return;
  }

  exchangeInfo.innerHTML = `
    1 USD = ${rate} PEN
  `;
}

loadExchangeRate();
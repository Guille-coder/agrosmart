import { getInventory, saveInventory } from "./services/inventoryService.js";

const form = document.getElementById("inventoryForm");
const listContainer = document.getElementById("inventoryList");

let inventory = getInventory();

/* ===============================
   RENDER
================================= */

function renderInventory() {
  listContainer.innerHTML = "";

  if (inventory.length === 0) {
    listContainer.innerHTML =
      `<div class="empty-state">No inventory items added yet.</div>`;
    return;
  }

  const grid = document.createElement("div");
  grid.classList.add("inventory-grid");

  inventory.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("inventory-card");

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p><strong>Quantity:</strong> ${item.quantity}</p>
      <p><strong>Unit:</strong> ${item.unit}</p>
      <button class="btn-delete" data-index="${index}">Delete</button>
    `;

    grid.appendChild(card);
  });

  listContainer.appendChild(grid);

  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      inventory.splice(index, 1);
      saveInventory(inventory);
      renderInventory();
    });
  });
}

/* ===============================
   ADD ITEM
================================= */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("itemName").value.trim();
  const quantity = document.getElementById("itemQuantity").value;
  const unit = document.getElementById("itemUnit").value.trim();

  if (!name || !quantity || !unit) return;

  inventory.push({ name, quantity, unit });
  saveInventory(inventory);
  renderInventory();

  form.reset();
});

renderInventory();
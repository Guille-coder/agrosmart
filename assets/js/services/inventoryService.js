const STORAGE_KEY = "agrosmart_inventory";

export function getInventory() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveInventory(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
export function getAnimals() {
  return JSON.parse(localStorage.getItem("animals")) || [];
}

export function saveAnimals(animals) {
  localStorage.setItem("animals", JSON.stringify(animals));
}

import { renderAnimals } from "./ui/animalUI.js";
import { getAnimals, saveAnimals, getAnimalInfo } from "./services/animalService.js";

/* ===============================
   DOM ELEMENTS
================================= */

const animalForm = document.getElementById("animalForm");
const animalList = document.getElementById("animalList");

/* ===============================
   STATE
================================= */

let animals = getAnimals();

/* ===============================
   UI UPDATE
================================= */

function updateUI() {
  renderAnimals(animalList, animals, deleteAnimal);
}

/* ===============================
   DELETE
================================= */

function deleteAnimal(index) {
  animals.splice(index, 1);
  saveAnimals(animals);
  updateUI();
}

/* ===============================
   FORM SUBMIT + API
================================= */

animalForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("animalName").value;
  const type = document.getElementById("animalType").value;

  if (!name || !type) return;

  // Fetch extra info from API
  const apiData = await getAnimalInfo(type);

  animals.push({
    name,
    type,
    habitat: apiData?.locations?.join(", ") || "Unknown",
    diet: apiData?.characteristics?.diet || "Unknown"
  });

  saveAnimals(animals);
  updateUI();
  animalForm.reset();
});

/* ===============================
   INIT
================================= */

updateUI();
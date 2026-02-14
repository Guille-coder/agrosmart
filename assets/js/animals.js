import { getAnimals, saveAnimals } from "./services/animalService.js";
import { renderAnimals } from "./ui/animalUI.js";

const animalForm = document.getElementById("animalForm");
const animalList = document.getElementById("animalList");

let animals = getAnimals();

function updateUI() {
  renderAnimals(animalList, animals, deleteAnimal);
}

function deleteAnimal(index) {
  animals.splice(index, 1);
  saveAnimals(animals);
  updateUI();
}

animalForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("animalName").value;
  const type = document.getElementById("animalType").value;

  animals.push({ name, type });

  saveAnimals(animals);
  updateUI();
  animalForm.reset();
});

updateUI();
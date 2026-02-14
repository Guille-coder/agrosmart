const animalForm = document.getElementById("animalForm");
const animalList = document.getElementById("animalList");

let animals = JSON.parse(localStorage.getItem("animals")) || [];

function saveAnimals() {
  localStorage.setItem("animals", JSON.stringify(animals));
}

function renderAnimals() {
  animalList.innerHTML = "";

  animals.forEach((animal, index) => {
    const div = document.createElement("div");
    div.classList.add("animal-card");

    div.innerHTML = `
      <h3>${animal.name}</h3>
      <p>Type: ${animal.type}</p>
      <button onclick="deleteAnimal(${index})">Delete</button>
    `;

    animalList.appendChild(div);
  });
}

animalForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("animalName").value;
  const type = document.getElementById("animalType").value;

  const newAnimal = {
    name: name,
    type: type
  };

  animals.push(newAnimal);
  saveAnimals();
  renderAnimals();

  animalForm.reset();
});

function deleteAnimal(index) {
  animals.splice(index, 1);
  saveAnimals();
  renderAnimals();
}

renderAnimals();
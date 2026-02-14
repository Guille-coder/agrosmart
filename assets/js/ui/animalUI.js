export function renderAnimals(container, animals, onDelete) {
  container.innerHTML = "";

  animals.forEach((animal, index) => {
    const div = document.createElement("div");
    div.classList.add("animal-card");

    div.innerHTML = `
      <h3>${animal.name}</h3>
      <p>Type: ${animal.type}</p>
      <button class="btn-delete" data-index="${index}">Delete</button>
    `;

    container.appendChild(div);
  });

  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      onDelete(index);
    });
  });
}
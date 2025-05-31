import { loadDishes, saveDishes, getDishes } from './storage.js';

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("add-dish-form");
  const dishInput = document.getElementById("dish-name");
  const tableBody = document.querySelector("#dish-table tbody");

  let dishes = await loadDishes();
  renderDishes();

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = dishInput.value.trim();
    if (!name) return alert("Bitte einen Namen eingeben!");

    dishes.push(name);
    await saveDishes(dishes);
    renderDishes();

    document.getElementById("modal").style.display = "none";
    dishInput.value = "";
  });

  function renderDishes() {
    tableBody.innerHTML = "";
    getDishes().forEach((dish) => {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.textContent = dish;
      row.appendChild(cell);
      tableBody.appendChild(row);
    });
  }
});

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

document.addEventListener("DOMContentLoaded", async function () {
  const modal = document.getElementById("modal");
  const openModalButton = document.getElementById("open-modals");
  const closeModalButton = document.querySelector(".close");
  const form = document.getElementById("add-dish-form");
  const dishNameInput = document.getElementById("dish-name");
  const dishTableBody = document.getElementById("dish-table-body");

  let dishes = [];
  let editId = null;

  if (modal) modal.style.display = "none";

  // Modal öffnen
  if (openModalButton) {
    openModalButton.addEventListener("click", () => {
      editId = null;
      dishNameInput.value = "";
      modal.style.display = "flex";
    });
  }

  // Modal schließen
  if (closeModalButton) {
    closeModalButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Klick außerhalb des Modals
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Gericht speichern
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const dishName = dishNameInput?.value.trim();
      if (!dishName) {
        alert("Bitte einen Namen eingeben!");
        return;
      }

      if (editId !== null) {
        dishes[editId] = dishName;
      } else {
        dishes.push(dishName);
      }

      dishNameInput.value = "";
      modal.style.display = "none";

      await saveDishes();
      renderDishes();
    });
  }

  async function saveDishes() {
    try {
      await Filesystem.writeFile({
        path: 'dishlist.json',
        data: JSON.stringify(dishes),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
    }
  }

  async function loadDishes() {
    try {
      const result = await Filesystem.readFile({
        path: 'dishlist.json',
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      dishes = JSON.parse(result.data);
      renderDishes();
    } catch (err) {
      dishes = [];
    }
  }

  function renderDishes() {
    if (!dishTableBody) return;
    dishTableBody.innerHTML = "";

    dishes.forEach((dish, index) => {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.textContent = dish;
      row.appendChild(cell);
      dishTableBody.appendChild(row);
    });
  }

  // Initial
  await loadDishes();
});

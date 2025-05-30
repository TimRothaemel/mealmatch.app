document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const openModalButton = document.getElementById("open-modals");
  const closeModalButton = document.querySelector(".close");
  const form = document.getElementById("add-dish-form");
  const dishNameInput = document.getElementById("dish-name");

  let dishes = [];
  let editId = null;

  if (modal) {
    modal.style.display = "none";
  }

  // Modal öffnen
  if (openModalButton) {
    openModalButton.addEventListener("click", () => {
      editId = null;
      if (dishNameInput) dishNameInput.value = "";
      modal.style.display = "flex";
    });
  }

  // Modal schließen
  if (closeModalButton) {
    closeModalButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Gericht speichern (nur im Array)
  if (form) {
    form.addEventListener("submit", (event) => {
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

      console.log("Gerichte:", dishes); // zu Testzwecken

      dishNameInput.value = "";
      modal.style.display = "none";

      // Hier später renderDishes() oder Export-Funktion einbauen
    });
  }
});

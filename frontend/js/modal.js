document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("open-modals");
  const closeModalBtn = document.querySelector(".close");

  function openModal() {
    modal.style.display = "flex";
    const input = document.getElementById("dish-name");
    if (input) input.value = "";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  openModalBtn?.addEventListener("click", openModal);
  closeModalBtn?.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
});

import { loadDishes, saveDishes } from './storage.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('add-dish-form');
  const dishInput = document.getElementById('dish-name');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = dishInput.value.trim();
    if (!name) return alert('Bitte einen Namen eingeben!');

    const dishes = await loadDishes();
    dishes.push(name);
    await saveDishes(dishes);

    // Nach Speichern zurück zur Liste (dishlist.html)
    window.location.href = 'dishlist.html';
  });
});

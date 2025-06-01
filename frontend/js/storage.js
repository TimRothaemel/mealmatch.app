import { Filesystem, Directory, Encoding } from '/@capacitor/filesystem';

let dishesCache = [];

export async function loadDishes() {
  try {
    const result = await Filesystem.readFile({
      path: 'dishlist.json',
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });
    dishesCache = JSON.parse(result.data);
  } catch (e) {
    // Datei existiert noch nicht – leeres Array zurückgeben
    dishesCache = [];
  }

  return dishesCache;
}

export async function saveDishes(dishes) {
  try {
    const json = JSON.stringify(dishes);
    await Filesystem.writeFile({
      path: 'dishlist.json',
      data: json,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });
    dishesCache = dishes; // Cache aktualisieren
  } catch (e) {
    console.error('Fehler beim Speichern der dishes:', e);
  }
}

export function getDishes() {
  return dishesCache;
}

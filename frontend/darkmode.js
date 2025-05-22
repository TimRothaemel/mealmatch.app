document.addEventListener("DOMContentLoaded", () => {
  const themeSwitch = document.getElementById("theme-switch");

  // Darkmode-Status aus localStorage holen
  const darkmode = localStorage.getItem("darkmode");

  if (darkmode === "active") {
    document.body.classList.add("darkmode");
    themeSwitch.checked = true;
  } else {
    document.body.classList.remove("darkmode");
    themeSwitch.checked = false;
  }

  // Eventlistener für Checkbox-Änderung
  themeSwitch.addEventListener("change", () => {
    if (themeSwitch.checked) {
      document.body.classList.add("darkmode");
      localStorage.setItem("darkmode", "active");
    } else {
      document.body.classList.remove("darkmode");
      localStorage.setItem("darkmode", "inactive");
    }
  });
});

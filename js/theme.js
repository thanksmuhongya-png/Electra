/* ===================================================== MODE CLAIR / SOMBRE ===================================================== */ const themeToggle =
  document.getElementById("themeToggle");
/* ----------------------------------------------------- Récupérer le thème sauvegardé ----------------------------------------------------- */ const savedTheme =
  localStorage.getItem("theme");
/* ----------------------------------------------------- Appliquer le thème sauvegardé ----------------------------------------------------- */ if (
  savedTheme === "dark"
) {
  document.body.classList.add("dark-mode");
}
/* ----------------------------------------------------- Mettre à jour le bouton ----------------------------------------------------- */ function updateThemeButton() {
  const isDark = document.body.classList.contains("dark-mode");
  if (isDark) {
    themeToggle.setAttribute("aria-label", "Activer le mode clair");
    themeToggle.setAttribute("title", "Passer au mode clair");
  } else {
    themeToggle.setAttribute("aria-label", "Activer le mode sombre");
    themeToggle.setAttribute("title", "Passer au mode sombre");
  }
}
/* ----------------------------------------------------- Initialisation ----------------------------------------------------- */ updateThemeButton();
/* ----------------------------------------------------- Changement de thème ----------------------------------------------------- */ themeToggle.addEventListener(
  "click",
  () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    /* Sauvegarder le choix */ localStorage.setItem(
      "theme",
      isDark ? "dark" : "light",
    );
    /* Mettre à jour l'accessibilité */ updateThemeButton();
  },
);

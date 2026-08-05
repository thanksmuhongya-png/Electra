const themeToggle = document.getElementById("themeToggle");

// Au chargement de la page
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
}

// Lors du clic
themeToggle.addEventListener("change", () => {

    if (themeToggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }

});
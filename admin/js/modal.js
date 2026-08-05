const btnAjouter = document.getElementById("btnAjouter");
const modal = document.getElementById("modalProduit");
const btnClose = document.querySelector(".btn-close");
const form = document.getElementById("productForm");
const btnAnnuler = document.getElementById("btnAnnuler");

// Ouvrir
btnAjouter.addEventListener("click", () => {
    modal.classList.add("active");
});

// Fermer
btnClose.addEventListener("click", () => {
    modal.classList.remove("active");
});

// Fermer en cliquant en dehors de la fenêtre
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// Fermer avec la touche Échap
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.remove("active");
    }
});

btnAnnuler.addEventListener("click", () => {
    form.reset();          // Réinitialise le formulaire
    modal.classList.remove("active"); // Ferme la fenêtre
});
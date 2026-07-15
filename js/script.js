const cartes = document.querySelectorAll(".carte");
cartes.forEach(carte => {
    const img = carte.querySelector("img");
    function appliquerCouleur() {
        const colorThief = new ColorThief();
        const couleur = colorThief.getColor(img);
        img.style.backgroundColor = `rgb(${couleur[0]}, ${couleur[1]}, ${couleur[2]})`;
    }
    if (img.complete) {
        appliquerCouleur();
    } else {
        img.addEventListener("load", appliquerCouleur);
    }
});
const params = new URLSearchParams(window.location.search);
const idProduit = Number(params.get("id"));

fetch("../data/produits.json")
    .then(response => response.json())
    .then(produits => {
        const produit = produits.find(p => p.id === idProduit);
        if (!produit) {
            document.body.innerHTML = `
                <div class="erreur">
                    <h2>Produit introuvable</h2>
                    <a href="produits.html">Retour au catalogue</a>
                </div>
            `;
            return;
        }
        afficherProduit(produit, produits);
    })
    .catch(error => {
        console.error(error);
    });

function afficherProduit(produit, produits) {
    const caracteristiquesHTML = Object.entries(produit.caracteristiques)
    .map(([cle, valeur]) => `
        <li>${cle} : ${valeur}</li>
    `)
    .join("");

    const navigation = document.querySelector(".hero .nav");
    const section1 = document.querySelector(".pt1");
    const section2 = document.querySelector(".pt2 .cartes");

    navigation.innerHTML = "";
    navigation.innerHTML += `
        <a href="produits.html">Produits</a>
        <span>></span>
        <a href="produits.html?categorie=${produit.categorie}">${produit.categorie}</a>
        <span>></span>
        <a href="#">${produit.nom}</a>
    `;

    section1.innerHTML = "";
    section1.innerHTML += `
        <aside class="images">
            <img src="../${produit.image}">
            <div class="img">
                ${produit.images.map(image => `
                    <img src="../${image}" alt="${produit.nom}">
                `).join("")}
            </div>
        </aside>
        <article>
            <h1>${produit.categorie} - ${produit.marque} - ${produit.nom}</h1>
            <span class="prix">Prix : ${produit.prix} $</span>
            <p>${produit.disponibilite} chez nous avec une garantie de ${produit.garantie}</p>
            <p>${produit.description}</p>
            <div class="color">
                Couleurs disponibles : 
                Passer pour voir la couleur.
            </div>
            <div class="caracteristiques">
                <h2>Caractéristiques techniques</h2>
                <ul>
                    ${caracteristiquesHTML}
                </ul>
            </div>
        </article>
    `;
    const similaires = produits.filter(p =>
            p.categorie === produit.categorie &&
            p.id !== produit.id
        )
        .slice(0, 4);
    section2.innerHTML = "";
    section2.innerHTML += similaires.slice(0, 4).map(p => `
        <div class="carte">
            <img src="../${p.image}" alt="${p.nom}">
            <h3>${p.nom}</h3>
            <p>${p.description}</p>
            <a href="details.html?id=${p.id}">
                Voir les détails
            </a>
        </div>
    `)
}


// const couleursCSS = {
//     "Noir": "#000000",
//     "Blanc": "#FFFFFF",
//     "Argent": "#C0C0C0",
//     "Gris": "#808080",
//     "Rouge": "#E53935",
//     "Bleu": "#1E88E5",
//     "Vert": "#43A047",
//     "Jaune": "#FDD835",
//     "Orange": "#FB8C00",
//     "Rose": "#EC407A",
//     "Violet": "#8E24AA",
//     "Or": "#D4AF37",
//     "Titane Noir": "#3A3A3A",
//     "Titane Gris": "#6E6E6E",
//     "Transparent": "transparent"
// };
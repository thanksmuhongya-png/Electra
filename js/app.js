let tousLesProduits = [];
const params = new URLSearchParams(window.location.search);
const categorieURL = params.get("categorie");
fetch("../data/produits.json")
    .then(response => response.json())
    .then(produits => {
        tousLesProduits = produits;
        afficherProduitsCategorie(produits);
        if (categorieURL) {
            const produitsFiltres = produits.filter(produit =>
                produit.categorie === categorieURL
            );
            afficherProduits(produitsFiltres);
            // Active le bon filtre
            filtres.forEach(f => {
                f.classList.remove("active");
                if (f.dataset.categorie === categorieURL) {
                    f.classList.add("active");
                }
            });
        } else {
            afficherProduits(produits);
        }
    })
    .catch(error => {
        console.error("Erreur de chargement :", error);
    });

function afficherProduits(produits) {
    const liste = document.getElementById("listeProduits");
    liste.innerHTML = "";
    produits.forEach(produit => {
        liste.innerHTML += `
            <a href="details.html?id=${produit.id}" class="carte">
                <img src="${produit.image}" alt="${produit.nom}">
                <span class="categorie">${produit.categorie}</span>
                <h3>${produit.nom}</h3>
                <p>${produit.description}</p>
                <strong>Prix : ${produit.prix} $</strong>
                <span class="details">Voir les détails →</span>
            </a>
        `;
    });

    appliquerCouleurs();
}

function afficherProduitsCategorie(produits) {
    const carte = document.getElementById("card");
    if (!carte) {
        console.error("Le conteneur #card est introuvable");
        return;
    }
    const categories = produits.reduce((acc, produit) => {
        if (!acc[produit.categorie]) {
            acc[produit.categorie] = [];
        }
        acc[produit.categorie].push(produit);
        return acc;
    }, {});
    const produitsAleatoires = Object.values(categories).map(categorie => {
        const index = Math.floor(Math.random() * categorie.length);
        return categorie[index];
    });

    carte.innerHTML = produitsAleatoires.map(produit => `
        <div class="carte">
            <img src="../${produit.image}">
            <h3>${produit.nom}</h3>
            <p>${produit.description}</p>
            <p>Prix : ${produit.prix} $</p>
            <a href="details.html?id=${produit.id}">Voir les détails</a>
        </div>
        `).join("");
}

const recherche = document.getElementById("recherche");
recherche.addEventListener("input", () => {
    const texte = recherche.value.toLowerCase();
    const resultats = tousLesProduits.filter(produit => {
        return (
            produit.nom.toLowerCase().includes(texte)
            ||
            produit.categorie.toLowerCase().includes(texte)
        );
    });
    afficherProduits(resultats);
});

function appliquerCouleurs() {
    const cartes = document.querySelectorAll(".carte");
    cartes.forEach(carte => {
        const img = carte.querySelector("img");
        const extraireCouleur = () => {
            const colorThief = new ColorThief();
            const couleur = colorThief.getColor(img);
            img.style.backgroundColor = `rgb(${couleur.join(",")})`;
        };
        if (img.complete) {
            extraireCouleur();
        } else {
            img.addEventListener("load", extraireCouleur, { once: true });
        }
    });
}

const filtres = document.querySelectorAll(".filtre");
filtres.forEach(filtre => {
    filtre.addEventListener("click", (e) => {
        e.preventDefault();
        filtres.forEach(f => f.classList.remove("active"));
        filtre.classList.add("active");
        const categorie = filtre.dataset.categorie;
        if (categorie === "tous") {
            history.replaceState({}, "", "produits.html");
            afficherProduits(tousLesProduits);
        } else {
            history.replaceState({}, "", `produits.html?categorie=${categorie}`);
            const resultats = tousLesProduits.filter(produit =>
                produit.categorie === categorie
            );
            afficherProduits(resultats);
        }
    });
});


// Fonction pour charger la base de données depuis le fichier JSON
async function chargerDefauts() {
    try {
        // Va chercher le fichier dans le dossier data
        const reponse = await fetch('data/defauts.json');
        const defauts = await reponse.json();
        afficherDefauts(defauts);
    } catch (erreur) {
        console.error("Erreur de chargement de la base de données:", erreur);
        document.getElementById('liste-defauts').innerHTML = "Impossible de charger les données.";
    }
}

// Fonction pour injecter les données dans la page HTML
function afficherDefauts(defauts) {
    const conteneur = document.getElementById('liste-defauts');
    conteneur.innerHTML = ''; // On vide le conteneur

    defauts.forEach(defaut => {
        // Pour chaque défaut, on crée une ligne
        const ligne = document.createElement('div');
        ligne.className = 'defaut-item';
        
        ligne.innerHTML = `
            <div>
                <strong>${defaut.code}</strong> - ${defaut.description}
            </div>
            <button class="btn-defaut" onclick="signalerDefaut('${defaut.gravite}')">
                NOTER ${defaut.gravite.toUpperCase()}
            </button>
        `;
        
        conteneur.appendChild(ligne);
    });
}

// Fonction quand on clique sur un bouton de défaut
function signalerDefaut(gravite) {
    const bilan = document.getElementById('resultat-bilan');
    bilan.innerText = `DÉFAVORABLE (${gravite.toUpperCase()})`;
    bilan.style.color = "#ef4444";
    bilan.style.borderColor = "#ef4444";
}

// Lancement de l'application au démarrage
document.addEventListener('DOMContentLoaded', () => {
    chargerDefauts();
});
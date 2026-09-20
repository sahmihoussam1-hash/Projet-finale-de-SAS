// ==============================================================================
// 2. FONCTIONS DE SÉCURITÉ ET DE CALCUL (OUTILS INTERNES)
// ==============================================================================

/**
 * Nettoie les espaces superflus et met en minuscules.
 */
function Normalisernom(nom) {
    if (!nom) return "";
    return nom.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Valide la cohérence des données saisies pour une journée.
 */
function validerResultat(jour, exercicesTermines, totalExercices) {
    if (isNaN(jour) || jour < 1 || jour > 7) {
        return { valide: false, message: "Le jour doit être un nombre compris entre 1 et 7." };
    }
    if (isNaN(totalExercices) || totalExercices <= 0) {
        return { valide: false, message: "Le total d'exercices doit être supérieur à 0." };
    }
    if (isNaN(exercicesTermines) || exercicesTermines < 0) {
        return { valide: false, message: "Les exercices terminés ne peuvent pas être négatifs." };
    }
    if (exercicesTermines > totalExercices) {
        return { valide: false, message: `Incohérence : ${exercicesTermines} terminés sur ${totalExercices} proposés !` };
    }
    return { valide: true, message: "Ok" };
}

/**
 * Calcule le pourcentage global et le niveau d'un apprenant.
 */
function calculeProgression(apprenant) {
    let totaleTermines = 0;
    let totaleProposes = 0;

    for (let i = 0; i < apprenant.resultats.length; i++) {
        totaleTermines += apprenant.resultats[i].exercicesTermines;
        totaleProposes += apprenant.resultats[i].totalExercices;
    }

    let pourcentage = totaleProposes > 0 ? Math.floor((totaleTermines / totaleProposes) * 100) : 0;

    let niveau = "";
    if (pourcentage >= 80) niveau = "Solide";
    else if (pourcentage >= 50) niveau = "En progression";
    else niveau = "À renforcer";

    return { pourcentage, niveau };
}


// ==============================================================================
// 3. FONCTIONS CORRESPONDANT STRICTEMENT AU CAHIER DES CHARGES DU PROF
// ==============================================================================

// --- 1. AFFICHER APPRENANTS ---
function afficherApprenants() {
    console.log("\n--- Liste des apprenants ---");

    if (apprenants.length == 0) {
        console.log("Aucun apprenant enregistré.");
        return;
    }

    for (let i = 0; i < apprenants.length; i++) {
        let app = apprenants[i];
        let prog = calculeProgression(app);
        console.log(`ID: ${app.id} | ${app.nomComplet} (${app.ville}) - ${prog.pourcentage}% [${prog.niveau}]`);
    }
}

// --- 2. CRÉER UN APPRENANT (ID AUTO-INCRÉMENT : length + 1) ---
export function creerApprenant() {
  console.log("\n--- Créer Un Apprenant ---");

  let nomComplet = prompt("Nom complet : ");
  let ville = prompt("Ville : ");

  // 1. Vérification (sans le point-virgule après la parenthèse)
  if (!nomComplet || !ville || !nomComplet.trim() || !ville.trim()) {
    console.log("Erreur : Le nom et la ville ne peuvent pas être vides.");
    return;
  }

  // 2. Récupération du dernier ID pour auto-incrémentation
  let dernierApprenant = apprenants[apprenants.length - 1];
  let nouvelId = dernierApprenant ? dernierApprenant.id + 1 : 1;

  // 3. Création de l'objet (clés en minuscules pour être cohérent avec le reste)
  let nouvelApprenant = {
    id: nouvelId,
    nomComplet: Normalisernom(nomComplet),
    ville: ville.trim(),
    resultats: []
  };

  // 4. Ajout dans le tableau principal
  apprenants.push(nouvelApprenant);
  console.log(`Apprenant ${nouvelApprenant.nomComplet} créé avec succès (ID : ${nouvelId}) !`);
}
    

// --- 3. RECHERCHER UN APPRENANT PAR ID (Utilisation de .find()) ---
function rechercherParId() {
    console.log("\n--- Rechercher par ID ---");

    let idSaisi = parseInt(prompt("Entrez l'ID : "));
    if (isNaN(idSaisi)){
        console.log("Erreur:veuillez entrer un nemuro Id valide.");
        return;
    }
    let app = apprenants.find(a => a.id === idSaisi);

    if (app) {
        let prog = calculeProgression(app);
        console.log(`\nTrouvé : ID ${app.id} - ${app.nomComplet} (${app.ville})`);
        console.log(`Progression : ${prog.pourcentage}% | Niveau : ${prog.niveau}`);
    } else {
        console.log("Aucun apprenant trouvé avec cet ID.");
    }
}

// --- 4. RECHERCHER UN APPRENANT PAR NOM (Utilisation de Normalisernom & .filter()) ---
function rechercherParNom() {
    console.log("\n--- Rechercher par Nom ---");

    let recherche = prompt("Entrez le nom (ou partie du nom) : ");
    let recherchePropre = Normalisernom(recherche);

    if (!recherchePropre) {
        console.log("Erreur : La recherche ne peut pas être vide.");
        return;
    }

    let resultats = apprenants.filter(a => Normalisernom(a.nomComplet).includes(recherchePropre));

    if (resultats.length === 0) {
        console.log("Aucun résultat trouvé.");
    } else {
        console.log(`\n${resultats.length} résultat(s) trouvé(s) :`);
        resultats.forEach(app => {
            let prog = calculeProgression(app);
            console.log(`- ID ${app.id} : ${app.nomComplet} (${app.ville}) | ${prog.pourcentage}% [${prog.niveau}]`);
        });
    }
}

// --- 5. TRIER LES APPRENANTS PAR ORDRE ALPHABÉTIQUE (Utilisation de .sort()) ---
function trierParAlphabetique() {
    console.log("\n--- Liste triée par Ordre Alphabétique ---");

    let listeTriee = [...apprenants].sort((a, b) => a.nomComplet.localeCompare(b.nomComplet));

    listeTriee.forEach(app => {
        let prog = calculeProgression(app);
        console.log(`- ${app.nomComplet} (${app.ville}) : ${prog.pourcentage}% [${prog.niveau}]`);
    });
}

// --- 6. AJOUTER LE RÉSULTAT DE LA JOURNÉE (Avec validerResultat) ---
function ajouterResultatJournee() {
    console.log("\n--- Ajouter résultat de la journée ---");

    let idSaisi = parseInt(prompt("ID de l'apprenant : "));
    let app = apprenants.find(a => a.id === idSaisi);

    if (!app) {
        console.log("Erreur : Aucun apprenant trouvé avec cet ID.");
        return;
    }

    let jour = parseInt(prompt("Numéro du jour (1-7) : "));
    let exercicesTermines = parseInt(prompt("Exercices terminés : "));
    let totalExercices = parseInt(prompt("Total exercices proposés : "));

    // Contrôle avec la fonction de validation
    let validation = validerResultat(jour, exercicesTermines, totalExercices);
    if (!validation.valide) {
        console.log(`Erreur : ${validation.message}`);
        return;
    }

    let challengeReponse = prompt("Challenge réussi ? (oui/non) : ").toLowerCase().trim();
    let challengeTermine = (challengeReponse === "oui" || challengeReponse === "o");

    // Ajout du résultat
    app.resultats.push({
        jour,
        exercicesTermines,
        totalExercices,
        challengeTermine
    });

    let prog = calculeProgression(app);
    console.log(`\nSuccès ! Journée enregistrée pour ${app.nomComplet}. Nouvelle progression : ${prog.pourcentage}%.`);
}

// --- 7. AFFICHER LES STATISTIQUES (Total apprenants & Total par niveau) ---
function afficherStatistiques() {
    console.log("\n==========================================");
    console.log("               STATISTIQUES               ");
    console.log("==========================================");

    console.log(`Total des apprenants : ${apprenants.length}`);

    if (apprenants.length === 0) return;

    let solide = 0;
    let enProgression = 0;
    let aRenforcer = 0;

    apprenants.forEach(app => {
        let prog = calculeProgression(app);
        if (prog.niveau === "Solide") solide++;
        else if (prog.niveau === "En progression") enProgression++;
        else aRenforcer++;
    });

    console.log("\nTotal des apprenants par niveau :");
    console.log(` - Solide (>= 80%)       : ${solide}`);
    console.log(` - En progression (50-79%): ${enProgression}`);
    console.log(` - À renforcer (< 50%)    : ${aRenforcer}`);
}

// --- 8. TRI DES APPRENANTS PAR NIVEAU / PROGRESSION (Utilisation de .sort()) ---
function trierParNiveau() {
    console.log("\n--- Tri des apprenants par niveau (Progression) ---");

    let listeTriee = [...apprenants].sort((a, b) => {
        let progA = calculeProgression(a).pourcentage;
        let progB = calculeProgression(b).pourcentage;
        return progB - progA;
    });

    listeTriee.forEach((app, index) => {
        let prog = calculeProgression(app);
        console.log(`${index + 1}. ${app.nomComplet} : ${prog.pourcentage}% [${prog.niveau}]`);
    });
} 
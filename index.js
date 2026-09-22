import promptSync from 'prompt-sync';
import { apprenants } from './data.js'
import { afficherMenu } from './Menu.js';
// Import du module prompt-sync

const prompt = promptSync();



 
export function Normalisernom(nom) {
    if (!nom) return "";
    return nom.trim().toLowerCase().replace(/\s+/g, " ");
}


//  la cohérence des données
 
export function validerResultat(jour, exercicesTermines, totalExercices) {
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


 
 
export function calculeProgression(apprenant) {
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
   

export function afficherApprenants() {
    console.log("\n--- Liste des apprenants ---");

    if (apprenants.length === 0) {
        console.log("Aucun apprenant enregistré.");
        return;
    }

    for (let i = 0; i < apprenants.length; i++) {
        let app = apprenants[i];
        let prog = calculeProgression(app);
        console.log(`ID: ${app.id} | ${app.nomComplet} (${app.ville}) - ${prog.pourcentage}% [${prog.niveau}]`);
    }
}

export function creerApprenant() {
  console.log("\n--- Créer Un Apprenant ---");

  let nomComplet = prompt("Nom complet : ");
  let ville = prompt("Ville : ");

  
  if (!nomComplet || !ville || !nomComplet.trim() || !ville.trim()) {
    console.log("Erreur : Le nom et la ville ne peuvent pas être vides.");
    return;
  }

  
  let dernierApprenant = apprenants[apprenants.length - 1];
  let nouvelId = dernierApprenant ? dernierApprenant.id + 1 : 1;

 
  let nouvelApprenant = {
    id: nouvelId,
    nomComplet: Normalisernom(nomComplet),
    ville: ville.trim(),
    resultats: []
  };

  
  apprenants.push(nouvelApprenant);
  console.log(`Apprenant ${nouvelApprenant.nomComplet} créé avec succès (ID : ${nouvelId}) !`);
}
    


export function rechercherParId() {
    console.log("\n--- Rechercher par ID ---");

    let idSaisi = parseInt(prompt("Entrez l'ID : "));
    if (isNaN(idSaisi)){
        console.log("Erreur:veuillez entrer un numéro ID valide.");
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


export function rechercherParNom() {

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


export function trierParAlphabetique() {
    console.log("\n--- Liste triée par Ordre Alphabétique ---");

    let listeTriee = [...apprenants].sort((a, b) => a.nomComplet.localeCompare(b.nomComplet));

    listeTriee.forEach(app => {
        let prog = calculeProgression(app);
        console.log(`- ${app.nomComplet} (${app.ville}) : ${prog.pourcentage}% [${prog.niveau}]`);
    });
}


export function ajouterResultatJournee() {
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

   
    let validation = validerResultat(jour, exercicesTermines, totalExercices);
    if (!validation.valide) {
        console.log(`Erreur : ${validation.message}`);
        return;
    }

    let challengeReponse = prompt("Challenge réussi ? (oui/non) : ").toLowerCase().trim();
    let challengeTermine = (challengeReponse === "oui" || challengeReponse === "o");

   
    app.resultats.push({
        jour,
        exercicesTermines,
        totalExercices,
        challengeTermine
    });

    let prog = calculeProgression(app);
    console.log(`\nSuccès ! Journée enregistrée pour ${app.nomComplet}. Nouvelle progression : ${prog.pourcentage}%.`);
}

export function afficherStatistiques() {
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


export function trierParNiveau() {
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
afficherMenu()
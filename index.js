import promptSync from 'prompt-sync';
import { apprenants } from './data.js'

// Import du module prompt-sync

const prompt = promptSync();
// 1
export function Normalisernom(nom) {
    if (!nom) return "";
    return nom.trim().toLowerCase();

}

export function calculeProgression(apprenant) {
    let totaleTermines = 0;
    let totaleProposes = 0;

    for (let i = 0; i < apprenant.resultats.length; i++) {
        let journee = apprenant.resultats[i];

        totaleTermines = totaleTermines + journee.exercicesTermines;
        totaleProposes = totaleProposes + journee.totalExercices;
    }

    let pourcentage = 0;
    if (totaleProposes > 0) {
        pourcentage = Math.round((totaleTermines / totaleProposes) * 100);
    }
    let niveau = "";
    if (pourcentage >= 80) {
        niveau = "solide";
    } else if (pourcentage >= 50) {
        niveau = "En progression";
    } else {
        niveau = "A renforcer";
    }
    return { totaleTermines, totaleProposes, pourcentage, niveau };
}


   // TABLEAU DE BORD
   export function afficherTableauDeBord () {
     console.log("\n--- Tableau de bord ---");
     if (apprenants.length == 0) {
       console.log("Aucun donnée disponible.");
       return;
     }
     let totalPourcentage = 0;
    let compteSolide = 0;
    let compteEnProgression = 0;
    let compteARenforcer = 0;

    for (let i=0;i < apprenants.length; i++){
            let prog = calculeProgression(apprenants[i]);
        totalPourcentage = totalPourcentage + prog.pourcentage;
    }

   }









//  2
export function afficherApprenants() {
    console.log("\n---Liste des apprenants---");

    if (apprenants.length == 0) {
        console.log("Aucun resultat trouver.");
        return;
    }
    for (let i = 0; i < apprenants.length; i++) {
        let app = apprenants[i];
        let prog = calculeProgression(app);

        console.log(
            i + " - " + app.nomComplet + " (" + app.ville + ") : " + prog.pourcentage + "% - " + prog.niveau
        );
    }
}
//  3 Créer un apprenant (ajouter nomComplet + ville) (id: est auto increment length++)
export function creerApprenant() {

    console.log("\n---Creer un apprenant---");

    let nomComplet = prompt("nomComplet:");
    let ville = prompt("ville:");

    if (!nomComplet.trim() || !ville.trim()) {
        console.log("Erreur: Le nom et la ville ne peuvent pas etre vide:");
        return;
    }

    let nouvelId = apprenants.length + 1;

    apprenants.push({
        id: nouvelId,
        nomComplet: nomComplet.trim(),
        ville: ville.trim(),
        resultats: [],
    });

    console.log("apprenant " + nomComplet + " cree avec succes (ID:" + nouvelId + ")!");
}

    // 5. Rechercher un apprenant par ID avec .find()
export function rechercherParId() {
 
    console.log("\n--- Rechercher par ID ---");
  
  let idSaisi = parseInt(prompt("Entrez l'ID : "));
  
  // .find cherche et envoie  l'apprenant avec le bon ID
  let app = apprenants.find(a => a.id === idSaisi);

  // Si app n'est pas undefined (un apprenant a été trouvé)
  if (app) {

    let prog = calculeProgression(app);
    console.log("Trouvé: ID " + app.id + " - " + app.nomComplet + " (" + app.ville + ")");
    console.log("Progression: " + prog.pourcentage + "% [" + prog.niveau + "]");
  } else {
    console.log("Aucun apprenant trouvé avec cet ID.");
  }
}
 
    















import { afficherMenu } from './Menu.js';

afficherMenu();
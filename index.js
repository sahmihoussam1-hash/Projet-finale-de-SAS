import promptSync from 'prompt-sync';
import { apprenants } from './data.js'
// Import du module prompt-sync

const prompt = promptSync();
// 1
function Normalisernom(nom) {
    if (!nom) return "";
    return nom.trim().toLowerCase();

}

function calculeProgression(apprenant) {
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

//  2
function afficherApprenants() {
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
//  3 
function creerApprenant() {
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

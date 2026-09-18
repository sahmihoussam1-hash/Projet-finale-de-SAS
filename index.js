import promptSync from 'prompt-sync';
import { apprenants } from './data.js'

// Import du module prompt-sync

const prompt = promptSync();
// 1-n7yde les espaces w normaliser les noms:
export function Normalisernom(nom) { 
    if (!nom) return "";
    return nom.trim().toLowerCase();   // /\s+/g, " "

}
// 2-Calcule de progression :
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


//  3-TABLEAU DE BORD:
// securite  ila kan tableau vide :
export function afficherTableauDeBord() {
    console.log("\n--- Tableau de bord ---");
    if (apprenants.length == 0) {
        console.log("Aucun donnée disponible.");
        return;
    }
    // initialisation des compteurs :
    let totalPourcentage = 0;  // accumule la somme de tous pourcentage
    let compteSolide = 0;
    let compteEnProgression = 0;
    let compteARenforcer = 0;
// boucle pour parcourir les apprenants un par un :
    for (let i = 0; i < apprenants.length; i++) {
        let prog = calculeProgression(apprenants[i]); // fait une appel pour le pourcentage et le niveau individuel d apprenant courant
        totalPourcentage = totalPourcentage + prog.pourcentage; // katzid le pourcentage l'accumule totale

        if (prog.niveau == "solide") compteSolide++; // analyse de les niveaux retourne et incremente lcompteur correspondant
        else if (prog.niveau == "En progression")
            compteEnProgression++;
        else compteARenforcer++;
    }
    let moyenne = Math.round(totalPourcentage / apprenants.length);
// afficher l'ensemble calculés f un tableau de bord f terminal:
    console.log("Nombre totale d'apprenants :" + apprenants.length);

    console.log("Moyenne générale de progression :" + moyenne + "%");

    console.log("Répartition par niveau :");

    console.log(" - Solide :" + compteSolide);

    console.log(" - En progression :" + compteEnProgression);

    console.log(" - A renforcer :" + compteARenforcer);
}

//  4-Afficher Apprenants:
export function afficherApprenants() {
    console.log("\n---Liste des apprenants---");

    if (apprenants.length == 0) {
        console.log("Aucun resultat trouver.");
        return;
    }
    for (let i = 0; i < apprenants.length; i++) {
        let app = apprenants[i];
        let prog = calculeProgression(app);

        console.log(app.id + " - " + app.nomComplet + " (" + app.ville + ") : " + prog.pourcentage + "% - " + prog.niveau);
    }
}
//  4-Créer un apprenant (ajouter nomComplet + ville) (id: est auto increment length++):
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

// 5-n9lbo 3la apprenant b Id dyalo:
export function rechercherParId() {

    console.log("\n--- Rechercher par ID ---");

    let idSaisi = parseInt(prompt("Entrez l'ID : "));
    // .find cherche et envoie  l'apprenant avec le bon ID:
    let app = apprenants.find(a => a.id === idSaisi);
    // Ila kant app undifined implique resultas trouver:
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
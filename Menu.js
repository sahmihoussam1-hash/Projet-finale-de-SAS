import promptSync from 'prompt-sync';


const prompt = promptSync();

import {
  afficherTableauDeBord,
  afficherApprenants,
  creerApprenant,
  rechercherParId
//   ajouterModifierResultat,
//   rechercherParNom,
//   filtrerParNiveau,
//   trierParProgression,
//   trierParNom
} from './index.js';



export function afficherMenu() {
    
    while (true) {
        
    console.log("\n==========================================");
    console.log("           SAS PROGRESS CONSOLE           ");
    console.log("==========================================");
    console.log("1. Afficher les apprenants");
    console.log("2. Créer un apprenant");
    console.log("3. Rechercher un apprenant par ID");
    console.log("0. Quitter");
    console.log("==========================================");

    let choix = prompt("Votre choix : ");

    switch (choix) {
      case "1" : afficherApprenants(); break;
      case "2" : creerApprenant(); break;
      case "3" : rechercherParId(); break;
      case "0":
        console.log("Au revoir !");
        return; // Quitte la fonction et arrête la boucle
      default:
        console.log("Choix invalide. Veuillez réessayer.");
    }
  }
 }
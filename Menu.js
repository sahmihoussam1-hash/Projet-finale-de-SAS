import promptSync from 'prompt-sync';


const prompt = promptSync();

import {
  afficherTableauDeBord,
  afficherApprenants,
  creerApprenant,
  rechercherParId
  ajouterModifierResultat,
  rechercherParNom,
  filtrerParNiveau,
  trierParProgression,
  trierParNom
} from './index.js';



export function afficherMenu() {
    
   let continuer = true;

    while (continuer) {
        console.log("\n==========================================");
        console.log("              MENU PRINCIPAL              ");
        console.log("==========================================");
        console.log("1. Afficher les apprenants");
        console.log("2. Créer un apprenant");
        console.log("3. Rechercher un apprenant par ID");
        console.log("4. Rechercher un apprenant par nom");
        console.log("5. Trier les apprenants par ordre alphabétique");
        console.log("------------------------------------------");
        console.log("6. Ajouter le résultat de la journée");
        console.log("7. Afficher les statistiques globales");
        console.log("8. Trier les apprenants par niveau");
        console.log("------------------------------------------");
        console.log("0. Quitter");
        console.log("==========================================");

        let choix = prompt("Votre choix : ").trim();

        switch (choix) {
            case "1":
                afficherApprenants();
                break;
            case "2":
                creerApprenant();
                break;
            case "3":
                rechercherParId();
                break;
            case "4":
                rechercherParNom();
                break;
            case "5":
                trierParAlphabetique();
                break;
            case "6":
                ajouterResultatJournee();
                break;
            case "7":
                afficherStatistiques();
                break;
            case "8":
                trierParNiveau();
                break;
            case "0":
                console.log("\nAu revoir !");
                continuer = false;
                break;
            default:
                console.log("\nChoix invalide. Veuillez réessayer.");
        }
    }
}

// Lancement du programme
lancerMenu();
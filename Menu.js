// 1. IMPORTS
import promptSync from 'prompt-sync';
import {
  afficherApprenants,
  creerApprenant,
  rechercherParId,
  rechercherParNom,
  trierParAlphabetique,
  ajouterResultatJournee,
  afficherStatistiques,
  trierParNiveau
} from './index.js';

// 2. INITIALISATION DE PROMPT (OBLIGATOIREMENT ICI, AVANT LA FONCTION !)
const prompt = promptSync();

// 3. FONCTION PRINCIPALE
export function afficherMenu() {
  const prompt = promptSync();
    let continuer = true;

    while (continuer) {
        console.log("\n==========================================");
        console.log("              MENU PRINCIPAL              ");
        console.log("==========================================");
        console.log("1. Afficher les apprenants");
        console.log("2. Créer un apprenant");
        console.log("3. Rechercher un apprenant par ID");
        console.log("4. Rechercher un apprenant par nom");
        console.log("5. Trier par ordre alphabétique");
        console.log("6. Ajouter le résultat d'une journée");
        console.log("7. Afficher les statistiques");
        console.log("8. Trier par niveau / progression");
        console.log("0. Quitter");
        console.log("==========================================");

        // Récupération sécurisée du choix (le ?.trim() évite les plantages si la saisie est null)
        let saisie = prompt("Votre choix : ");
        let choix = saisie ? saisie.trim() : "";

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
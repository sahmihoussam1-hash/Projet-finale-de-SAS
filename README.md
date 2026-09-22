# 🚀 Système de Gestion des Apprenants (Projet SAS - YouCode)

Un système en ligne de commande (CLI) développé en **Node.js** permettant d'enregistrer, suivre et analyser la progression académique des apprenants.

---

## 📌 Table des Matières
- [Présentation](#-présentation)
- [Fonctionnalités](#-fonctionnalités)
- [Stack Technique](#-stack-technique)
- [Structure du Projet](#-structure-du-projet)
- [Installation et Configuration](#-installation-et-configuration)
- [Exécution](#-exécution)
- [Guide des Fonctions](#-guide-des-fonctions)

---

## 📖 Présentation

Ce projet a été réalisé dans le cadre de la formation **YouCode (Projet SAS)**. Il s'agit d'une application CLI modulaire conçue pour :
- Gérer les données des apprenants (création, recherche, affichage).
- Enregistrer et valider les résultats quotidiens des exercices et challenges.
- Calculer dynamiquement le pourcentage de progression global et attribuer des niveaux de maîtrise (`Solide`, `En progression`, `À renforcer`).
- Trier et générer des statistiques sur la promotion.

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
| :--- | :--- |
| **Gestion des apprenants** | Création d'apprenant avec ID auto-incrémenté et normalisation automatique des noms. |
| **Saisie sécurisée** | Ajout des résultats journaliers (1 à 7) avec contrôle strict de cohérence des données. |
| **Calcul dynamique** | Évaluation en temps réel du pourcentage global et du niveau de compétence. |
| **Recherche avancée** | Recherche par ID unique ou recherche partielle par nom (insensible à la casse). |
| **Tri & Statistiques** | Tri par ordre alphabétique ou par niveau de progression, et tableau de bord statistique. |

---

## 🛠️ Stack Technique

- **Langage :** JavaScript (ES6+)
- **Environnement :** Node.js
- **Architecture :** ES Modules (`import` / `export`)
- **Dépendance :** `prompt-sync` (Saisie utilisateur synchrone)
- **Méthodes ES6 clé :** `.find()`, `.filter()`, `.sort()`, `.forEach()`, Spread Operator (`[...]`).

---

## 📁 Structure du Projet

```text
Projet-finale-de-SAS/
│
├── data.js         # Base de données initiale (tableau des apprenants)
├── index.js        # Logique métier et fonctions de traitement principal
├── Menu.js         # Interface utilisateur CLI (boucle du menu principal)
├── package.json    # Configuration du projet Node.js ("type": "module")
└── README.md       # Documentation du projet
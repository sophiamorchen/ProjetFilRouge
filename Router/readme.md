# Le Routage

Le routage gère la navigation entre différentes pages ou vues d'une application web côté client (dans le navigateur de l'utilisateur).  
Il permet de définir des règles et comportements pour gérer les transitions entre les différentes URL ou routes.

---

## Fonctionnement du Routage

- Lorsqu'un utilisateur clique sur un lien ou effectue une action modifiant l'URL :  
  - Le routage détecte cet événement.  
  - Il déclenche une fonction ou un gestionnaire défini par le développeur.

- La fonction clé **getRouteByUrl** compare l'URL actuelle avec celles définies dans la table de routes :  
  - Si une correspondance est trouvée,  
  - Elle récupère les informations de la route pour charger la vue associée.  

- Ce processus met à jour l'état de l'application et affiche la vue correspondante à l'URL en cours.

---

## La table de routage

Le système utilise une table de correspondance qui associe chaque URL à une vue ou un composant.  
Lorsqu'une URL est détectée :  
- La table est consultée pour trouver la vue ou le composant associé.  
- Les paramètres extraits de l'URL (par ex. identifiants, valeurs) sont transmis à la vue ou au composant.

---

## Structure du projet

Le système de routage repose sur trois fichiers principaux :

### 1. `Route.js`  
- Définit la classe `Route` représentant une route de l'application.  
- Chaque route possède :  
  - une URL,  
  - un titre,  
  - un chemin vers un fichier HTML,  
  - un chemin vers un fichier JavaScript (optionnel).  

### 2. `allRoutes.js`  
- Crée un tableau `allRoutes` contenant toutes les routes de l'application, en utilisant la classe `Route`.  
- Définit également la variable `websiteName` qui représente le nom du site.

### 3. `router.js`  
- Importe la classe `Route`, ainsi que `allRoutes` et `websiteName`.  
- Contient la logique de routage principale.

---

## Chargement des vues

La fonction **LoadContentPage** est responsable d'afficher la contenu d'une vue :  
- Elle récupère le chemin du fichier HTML correspondant à la route.  
- Utilise `fetch` pour charger le contenu HTML.  
- Injecte ce contenu dans l'élément DOM dédié.

Si la route inclut un chemin vers un fichier JavaScript :  
- Ce script est chargé dynamiquement dans le document, permettant l'ajout de fonctionnalités spécifiques à cette vue.

### Mise à jour du titre

Après le chargement, le système met à jour le titre de la page en combinant le titre de la route et le nom du site, pour une expérience cohérente.

---

## En résumé

Ce système de routage facilite la gestion dynamique des vues, permettant une navigation fluide et modulaire en fonction des URL.  
Il sépare clairement la configuration des routes, la logique de chargement, et l'affichage des contenus, pour un développement organisé et performant.
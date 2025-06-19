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

## Import de bootstrap / puis custom

## 1. Bootstrap et les fichiers CSS/SCSS
- Bootstrap officiel propose un fichier CSS minifié (`bootstrap.min.css`) prêt à l'emploi.
- Le fichier `custom.scss` sert à personnaliser Bootstrap en modifiant ses variables avant de compiler ton propre CSS.
- Si tu importes `bootstrap.min.css` **et** un CSS compilé à partir de `custom.scss`, tu risques d'avoir des styles doublons ou des conflits.
- En général, tu choisis soit le fichier CSS officiel minifié, soit ta version compilée à partir de SCSS personnalisé.

## 2. Pourquoi modifier les variables avant import SCSS ?
- En SCSS, les variables doivent être définies **avant** d'importer Bootstrap pour qu'elles prennent effet.
- Exemple : définir `$primary: #906427;` avant `@import "bootstrap";` dans le _custom.scss pour changer la couleur principale.

## 3. Utilisation de npm et package.json
- `package.json` sert à gérer les dépendances de ton projet (dont Bootstrap si installé via npm).
- `npm install` installe les paquets listés dans `package.json`.
- `npm init` crée un nouveau `package.json`, ce n'est pas obligatoire si tu as déjà un projet avec ce fichier.
- Le fichier `package.json` est surtout utile pour le développeur, pas pour le client final.

## 4. Inclusion de Bootstrap Icons
- Bootstrap Icons ont leur propre CSS (`bootstrap-icons.css`), séparé du CSS Bootstrap.
- Il faut inclure le CSS des icônes à part, car elles ne sont pas dans `bootstrap.min.css`.

## 5. Erreurs liées aux préfixes CSS (-webkit- etc.)
- Ces erreurs sont des avertissements sur la compatibilité navigateur.
- En production, ce n’est généralement pas bloquant, mais il est conseillé d’utiliser des outils comme Autoprefixer pour gérer ça automatiquement.

## 6. Ordre des styles dans CSS
- Certaines propriétés doivent être listées dans un ordre précis (préfixées puis standard).
- Exemple : `text-align: -webkit-match-parent;` puis `text-align: match-parent;`

## 7. Résumé sur le href="/" dans un lien HTML
- `href="/"` cible la racine du site (la page d'accueil).
- Le comportement dépend du serveur ou du routeur utilisé.


## 8. Recherche des adresses de e-mail dans un texte
 - Recherche des adresses e-mail dans un texte
  Expression régulière : `^[^\s@]+@[^\s@]+\.[^\s@]+$`

- Dans cette expression régulière, nous cherchons à identifier une adresse e-mail. 
- Voici ce que signifient les différents éléments de l'expression :

- ^ : début de la chaîne.

- [^\s@]+ : recherche un ou plusieurs caractères qui ne sont ni des espaces (\s) 
- ni des arobases (@).

- @ : recherche le caractère « @ ».

- [^\s@]+ : recherche un ou plusieurs caractères qui ne sont ni des espaces (\s) 
- ni des - arobases (@).
- 
- \. : recherche le caractère point (il doit être échappé car le point est un caractère 
- spécial en expression régulière).

- [^\s@]+ : recherche un ou plusieurs caractères qui ne sont ni des espaces (\s) 
- ni des arobases (@).
 
- $ : fin de la chaîne.
 
- Ce regex vérifie donc que l'adresse e-mail a au moins un caractère avant 
- et après le « @ » - et qu'il y a un point entre deux séquences de caractères.
 
- Vous pouvez avoir plus d’informations sur ce regex sur ce lien 
- notamment l’onglet - ‘explanation’ à droite : regular expressions 101

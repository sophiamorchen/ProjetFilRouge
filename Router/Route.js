// Définition de la classe Route représentant une route (ou page) de l'application
export default class Route {
    /**
     * @param {string} url - L'URL de la page (ex: "/contact")
     * @param {string} title - Le titre de la page (utilisé dans le <title>)
     * @param {string} pathHtml - Le chemin du fichier HTML à charger
     * @param {string[]} authorize - Les rôles autorisés à accéder à la page
     * @param {string} [pathJs=""] - Le chemin du fichier JS associé à la page (facultatif)
     */
    constructor(url, title, pathHtml, authorize, pathJs = "") {
        this.url = url;               // URL de la page
        this.title = title;           // Titre de la page
        this.pathHtml = pathHtml;     // Chemin vers le fichier HTML de la page
        this.authorize = authorize;   // Tableau des rôles autorisés à accéder
        this.pathJs = pathJs;         // Chemin vers le fichier JS associé (facultatif)
    }
}

/* 
L'attribut "authorize" est un tableau de chaînes de caractères indiquant 
qui peut accéder à la page. Il peut contenir les valeurs suivantes :

- [] : tout le monde peut accéder à la page (même les non connectés)
- ["disconnected"] : seulement les utilisateurs non connectés
- ["client"] : seulement les utilisateurs ayant le rôle "client"
- ["admin"] : seulement les utilisateurs ayant le rôle "admin"
- ["admin", "client"] : les utilisateurs ayant l'un ou l'autre rôle
*/

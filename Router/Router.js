import Route from "./Route.js"
import { allRoutes, websiteName } from "./allRoutes.js" 

// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html");

// Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
    let currentRoute = null
    // Parcours toutes les routes pour trouver la correspondance 
    allRoutes.forEach((element) => {
        if (element.url === url) { 
            currentRoute = element;
        }
    });
    // Si aucune correspondance n'est trouvée, on retourne la route 404
    return currentRoute || route404;
    // if (currentRoute != null) {
    //     return currentRoute || route404
    // }
    // 👉 Bonus : tu peux simplifier avec `return currentRoute || route404`
}

// Fonction pour chagrer le contenu de la page
const LoadContentPage = async () => {
    const main = document.getElementById("main-page")
    main.classList.add("fade-out")
    const path = window.location.pathname// récupération de l'URL actuelle
    const actualRoute = getRouteByUrl(path)
    // Récupération du contenu HTML de la route
    const html = await fetch(actualRoute.pathHtml).then((data) => data.text())
    // Ajout du contenu HTML à l'élément avec l'ID "main-page"
    setTimeout(() => {
        main.innerHTML = html
        main.classList.remove("fade-out")
        main.classList.add("fade-in")

        // Ajout du contenu JS
        if(actualRoute.pathJs != "") {
            // Création d'une balise script
            var scriptTag = document.createElement("script")
            scriptTag.setAttribute("type", "text/javascript")
            scriptTag.setAttribute("src", actualRoute.pathJs)
            // Ajout de la balise script au corps du document
            document.body.appendChild(scriptTag)
        }
        // Changement du titre de la page
        document.title = `${actualRoute.title} - ${websiteName}`
        //Nettoyage : retire la classe parès transition
        setTimeout(() => {
            main.classList.remove("fade-in")
        }, 300);
    }, 300);
}

// Fonction pour gérer les événements du routage (clic sur les liens)
const routeEvent = (event) => {
    event = event || window.event // permet de garantir la compatibilité entre navigateurs modernes et anciens en récupérant l'événement d'une manière ou d'une autre.
    event.preventDefault()
    // Mise à jour de l'URL dans l'historique du navigateur
    window.history.pushState({}, "", event.target.href) // méthode du navigateur qui te permet de MODIFIER l'URL de la page dans la barre d'adresse SANS RECHARGER LA PAGE.
    //La nouvelle URL : event.target.href récupère l'URL du lien qui a été cliqué.
    
    // Fonction appelée juste après avoir mis à jour l'URL dans l'historique du navigateur.
    LoadContentPage()// Elle charge le contenu de la nouvelle page dans l'élément de la page actuel
    // 👉 Ajout : ce système évite le rechargement complet de la page (SPA = Single Page Application)
}

// Gestion de l'événement de retour en arrière dans l'historique du navigateur
window.onpopstate = LoadContentPage

// Assignation de la fonction routeEvent à la propriété route de la fenêtre 
window.route = routeEvent

// Chargement du contenu de la page 
LoadContentPage() // 👉 Ajout essentiel : sinon, rien ne s’affiche au chargement initial

/*
👇 Illustration simple avec un exemple
Supposons que tu cliques sur un lien qui mène à /contact. Voici ce qui se passe :

Avant le clic : L'URL de ta page est https://mon-site.com.

Tu cliques sur le lien contact :

event.preventDefault() arrête la redirection classique.

window.history.pushState({}, "", "/contact") change l'URL dans la barre d'adresse sans recharger la page.

La fonction LoadContentPage() est appelée et va chercher le contenu de la page /contact, puis l'afficher dans la page actuelle, sans recharger la page.
*/
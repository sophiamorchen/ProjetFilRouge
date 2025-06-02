import Route from "./Route.js";

// définir ici les routes de l'application
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    // new Route("/Galerie", "Galerie", "/pages/galerie.html", "/js/galerie.js")
  //  new Route("/indexfront.html", "Accueil", "/pages/home.html"), solution si route ne marche pas. voir forum.
]

// Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";
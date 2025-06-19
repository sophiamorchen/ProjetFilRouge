import Route from "./Route.js";

// définir ici les routes de l'application
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/galerie", "La galerie", "/pages/galerie.html"),
    new Route("/carte", "La carte", "/pages/carte.html"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", "js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", "/js/auth/signup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html"),
    new Route("/editPassword", "Modifier mon mot de passe", "/pages/auth/editPassword.html"),
    new Route("/allResa", "Vos réservations", "/pages/reservations/allResa.html"),
    new Route("/reserver", "Réserver", "/pages/reservations/reserver.html"),
  //  new Route("/indexfront.html", "Accueil", "/pages/home.html"), solution si route ne marche pas. voir forum.
]

// Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";
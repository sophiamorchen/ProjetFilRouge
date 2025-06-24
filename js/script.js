const tokenCookieName = "accessToken"
const signoutBtn = document.getElementById('signout-btn')
const roleCookieName = "role"
const apiUrl = "https://127.0.0.1:8000/api/"

signoutBtn.addEventListener('click', signout)

function getRole() {
    return getCookie(roleCookieName)
}

function signout() {
    eraseCookie(tokenCookieName)
    eraseCookie(roleCookieName)
    // 1. À faire: ajouter une alert(êtes vous sur de vouloir vous déconnecter?)
    window.location.reload()
}
function setToken(token) {
    setCookie(tokenCookieName, token, 7 )
}

function getToken() {
    return getCookie(tokenCookieName)
}

// les cookies, sont des chaines de carctère stockées dans le navigateur de l'utilisateur.

// Fonction pour créer un cookie
function setCookie(name, value, days) {
    // Variable qui contiendra la date d'expiration du cookie
    var expires = "";
    // Si le paramètre "days" est fourni
    if (days) {
        // Crée un objet Date représentant la date et l'heure actuelles
        var date = new Date();
        // Modifie l'objet Date pour y ajouter "days" en millisecondes
        // (jours * 24 heures * 60 minutes * 60 secondes * 1000 ms)
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        // Convertit la date en chaîne UTC et prépare le format pour l'attribut expires
        expires = "; expires=" + date.toUTCString();
    }
    // Définit le cookie avec : nom=valeur ; expiration (si définie) ; path=/
    // Le path=/ signifie que le cookie est accessible dans tout le site
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}



function getCookie(name) {
    // On crée la chaîne qui correspond au nom du cookie suivi d'un '='
    var cookieName = name + "="

    // On récupère tous les cookies sous forme d'un tableau, chaque cookie est séparé par un ';'
    var cookieArray = document.cookie.split(';')

    // On parcourt tous les cookies
    for (var i = 0; i < cookieArray.length; i++) {
        // On récupère le cookie à l'index i
        var cookie = cookieArray[i]

        // On enlève les espaces blancs au début du cookie (trim à gauche)
        /*
        Le while dit : tant que le premier caractère est un espace ' ' (espace blanc),
        Alors on enlève ce premier caractère avec cookie.substring(1, cookie.length) 
        qui va retourner la chaîne cookie à partir du deuxième caractère jusqu'à la fin.
        On réaffecte cette nouvelle chaîne à cookie.
        */
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length)
        }
        // Si le cookie commence par le nom recherché (ex : 'username=')
        if (cookie.indexOf(cookieName) == 0) {
            // On retourne la valeur du cookie, c’est-à-dire tout ce qui suit 'username='
            return cookie.substring(cookieName.length, cookie.length)
        }
    }
    // Si aucun cookie avec ce nom n’a été trouvé, on retourne null
    return null
}

function eraseCookie(name){
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT'
}

function isConnected() {
    if(getToken() == null || getToken == undefined) {
        return false
    } else {
        return true
    }

}

/*
Nous avons 4 cas de consomateurs de notre site : 
disconnected
connected 
    admin
    client
*/
function showAndHideElementsForRoles() {
    const userConnected = isConnected()
    const role = getRole()

    let allElementsToEdit = document.querySelectorAll('[data-show]')

    allElementsToEdit.forEach(element => {
        switch(element.dataset.show){
            case 'disconnected':
                if(userConnected){
                    element.classList.add("d-none")
                }
                break
            case 'connected':
                if(!userConnected){
                    element.classList.add("d-none")
                }
                break
            case 'admin':
                if (!userConnected || role != "admin") {
                    element.classList.add("d-none")
                }
                break
            case 'client':
                if (!userConnected || role != "client") {
                    element.classList.add("d-none")
                }
                break
        }
    });
        


}
const tokenCookieName = "accessToken"
const signoutBtn = document.getElementById('signout-btn')
const roleCookieName = "role"
const apiUrl = "https://morchen.alwaysdata.net/api/"

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
    let expires = "";
    // Si le paramètre "days" est fourni
    if (days) {
        // Crée un objet Date représentant la date et l'heure actuelles
        let date = new Date();
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
    let cookieName = name + "="

    // On récupère tous les cookies sous forme d'un tableau, chaque cookie est séparé par un ';'
    let cookieArray = document.cookie.split(';')

    // On parcourt tous les cookies
    for (const element of cookieArray) {
        // On récupère le cookie à l'index i
        let cookie = element

        // On enlève les espaces blancs au début du cookie (trim à gauche)
        /*
        Le while dit : tant que le premier caractère est un espace ' ' (espace blanc),
        Alors on enlève ce premier caractère avec cookie.substring(1, cookie.length) 
        qui va retourner la chaîne cookie à partir du deuxième caractère jusqu'à la fin.
        On réaffecte cette nouvelle chaîne à cookie.
        */
        while (cookie.startsWith(' ')) {
            cookie = cookie.substring(1, cookie.length)
        }
        // Si le cookie commence par le nom recherché (ex : 'username=')
        if (cookie.startsWith(cookieName)) {
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
    if(getToken() == null || getToken() == undefined) {
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
    // Vérifie si un utilisateur est connecté (via un token)
    const userConnected = isConnected()

    // Récupère le rôle actuel de l'utilisateur connecté (ex: "admin", "client")
    const role = getRole()

    // Sélectionne tous les éléments HTML ayant un attribut [data-show]
    let allElementsToEdit = document.querySelectorAll('[data-show]')

    // Pour chaque élément sélectionné, on va décider s'il doit être affiché ou caché
    allElementsToEdit.forEach(element => {
        // On lit la valeur de l'attribut data-show pour savoir à qui cet élément est destiné
        switch (element.dataset.show) {
            case 'disconnected':
                // Si l'utilisateur est connecté, on cache les éléments destinés aux visiteurs non connectés
                if (userConnected) {
                    element.classList.add("d-none")
                }
                break
            case 'connected':
                // Si l'utilisateur n'est PAS connecté, on cache les éléments destinés aux utilisateurs connectés
                if (!userConnected) {
                    element.classList.add("d-none")
                }
                break
            case 'admin':
                // Si l'utilisateur n'est pas connecté ou qu'il n'a pas le rôle admin, on cache l'élément
                if (!userConnected || role != "admin") {
                    element.classList.add("d-none")
                }
                break
            case 'client':
                // Si l'utilisateur n'est pas connecté ou qu'il n'a pas le rôle client, on cache l'élément
                if (!userConnected || role != "client") {
                    element.classList.add("d-none")
                }
                break
        }
    });
}


//incroyable fonction qui transforme notre requête en texte. Ce qui nous permet d'éviter de l'injection de code
function sanitizeHtml(text) {
    const tempHtml = document.createElement('div')
    tempHtml.textContent = text
    return tempHtml.innerHTML
}

function getInfoUser() {
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken() )
    let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl + "account/me", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert('erreur l\'ors de la récupération des informations utilisateur')
            }
        })
        .then((result) => {
            return result
        })
        .catch(error => {
            console.error("erreur l'ors de la récupération des données", error)
        })
}


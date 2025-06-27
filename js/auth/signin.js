btnSignin.addEventListener('click', checkCredentials);

function checkCredentials(event) {
    event.preventDefault(); // Empêche le rechargement du formulaire

    let dataForm = new FormData(signinForm);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": dataForm.get('email'),
        "password": dataForm.get('mdp')
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/login", requestOptions)
        .then(response => {
            if (!response.ok) {
                // Gérer l'erreur ici et arrêter la chaîne
                mailInput.classList.add("is-invalid");
                pwdInput.classList.add("is-invalid");
                // Optionnel : afficher un message d'erreur visible à l'utilisateur
                throw new Error(`Erreur HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            if (!result.apiToken) {
                throw new Error("Pas de token reçu !");
            }
            const token = result.apiToken;
            setToken(token);
            setCookie(roleCookieName, result.roles[0], 7);
            window.location.replace("/");
        })
        .catch(error => {
            console.error("Erreur lors de la connexion :", error);
            // Tu peux ici afficher un message d'erreur utilisateur aussi
        });
}

const mailInput = document.getElementById('emailInput')
const pwdInput = document.getElementById('passwordInput')
const btnSignin = document.getElementById('btnSignin')
const signinForm = document.getElementById('signinForm')

btnSignin.addEventListener('click', checkCredentials)

function checkCredentials() {
    let dataForm = new FormData(signinForm)
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

    fetch(apiUrl+"login", requestOptions)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                mailInput.classList.add("is-invalid")
                pwdInput.classList.add("is-invalid")            }
        })
        .then((result) => {
            const token = result.apiToken
            // placer ce token en cookie
            setToken(token)
            setCookie(roleCookieName, result.roles[0], 7)
            window.location.replace("/")
        })
        .catch((error) => console.error(error));
}

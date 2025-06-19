const mailInput = document.getElementById('emailInput')
const pwdInput = document.getElementById('passwordInput')
const btnSignin = document.getElementById('btnSignin')

btnSignin.addEventListener('click', checkCredentials)

function checkCredentials() {
    // Ici , il faudra appeller l'API pour vérifier les credentials en bdd
    if (mailInput.value == "test@test.com" && pwdInput.value == 123){
        // il faudra récupérer le vrai token
        const token = "bfiafgbcnluirecgnaumaumaumaumelchgc"
        // placer ce token en cookie
        setToken(token)
        setCookie(roleCookieName, "client", 7)
        window.location.replace("/")
    } else {
        mailInput.classList.add("is-invalid")
        pwdInput.classList.add("is-invalid")
    }
}

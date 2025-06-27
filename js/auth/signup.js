//  Implémenter le js de ma page
// Vérifier les champs requis
const inputNom = document.getElementById('nomInput')
const inputPrenom = document.getElementById('prenomInput')
const inputEmail = document.getElementById('emailInput')
const inputPassword = document.getElementById('passwordInput')
const inputValidationPassword = document.getElementById('validatePasswordInput')
const btnValidation = document.getElementById('btn-validation-inscription')
const signupForm = document.getElementById('signupForm')


inputNom.addEventListener('input', validateForm)
inputPrenom.addEventListener('input', validateForm)
inputEmail.addEventListener('input', validateForm)
inputPassword.addEventListener('input', validateForm)
inputValidationPassword.addEventListener('input', validateForm)
btnValidation.addEventListener('click', userSubscription)

function validateForm() {
    const nomOk = validateRequired(inputNom)
    const prenomOk = validateRequired(inputPrenom)
    const mailTrue = validateMail(inputEmail)
    const passwordOK = validatePassword(inputPassword)
    const confPwdOk = validateConfirmationPassword(inputPassword, inputValidationPassword)

    if(nomOk && prenomOk && mailTrue && passwordOK && confPwdOk ) {
        btnValidation.disabled = false
    } else {
        btnValidation.disabled = true
    }
}

function validateConfirmationPassword(pwdInput, confPwdInput) {
    if(pwdInput.value === confPwdInput.value){
        confPwdInput.classList.add('is-valid')
        confPwdInput.classList.remove('is-invalid')
        return true
    } else {
        confPwdInput.classList.add('is-invalid')
        confPwdInput.classList.remove('is-valid')
        return false
    }
    
}

function validateMail(input) {
    // Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mailUser = input.value
    if (mailUser.match(emailRegex)){
        input.classList.add('is-valid')
        input.classList.remove('is-invalid')
        return true
    } else {
        input.classList.add('is-invalid')
        input.classList.remove('is-valid')
        return false
    }
}

function validatePassword(input) {
    // Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
    const passwordUser = input.value
    if (passwordUser.match(passwordRegex)){
        input.classList.add('is-valid')
        input.classList.remove('is-invalid')
        return true
    } else {
        input.classList.add('is-invalid')
        input.classList.remove('is-valid')
        return false
    }
}


function validateRequired(input){
    if(input.value.trim() !== ''){
        input.classList.add('is-valid')
        input.classList.remove('is-invalid')
        return true
    } else {
        input.classList.remove('is-valid')
        input.classList.add('is-invalid')
        return false
    }
}


function userSubscription() {
    let dataForm = new FormData(signupForm)
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "firstName": dataForm.get('nom'),
        "lastName": dataForm.get('prenom'),
        "email": dataForm.get('email'),
        "password": dataForm.get('mdp')
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/api/registration", requestOptions)
        .then((response) => {
            if(response.ok ){
                return response.json()
            } else {
                alert('erreur l\'ors de l\'sincription')
            }
        })
        .then((result) =>{
            alert("bravo " + String(dataForm.get('nom')) + ", l'inscription est réussie...");
            document.location.href ="/signin"
                console.log(result)
            })
            
        .catch((error) => console.error(error));
}


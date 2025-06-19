//  Implémenter le js de ma page
// Vérifier les champs requis
const inputNom = document.getElementById('nomInput')
const inputPrenom = document.getElementById('prenomInput')
const inputEmail = document.getElementById('emailInput')
const inputPassword = document.getElementById('passwordInput')
const inputValidationPassword = document.getElementById('validatePasswordInput')
const btnValidation = document.getElementById('btn-validation-inscription')
inputNom.addEventListener('input', validateForm)
inputPrenom.addEventListener('input', validateForm)
inputEmail.addEventListener('input', validateForm)
inputPassword.addEventListener('input', validateForm)
inputValidationPassword.addEventListener('input', validateForm)

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



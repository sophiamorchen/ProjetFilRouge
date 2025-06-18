//  Implémenter le js de ma page
// Vérifier les champs requis
const inputNom = document.getElementById('nomInput')
const inputPrenom = document.getElementById('prenomInput')
console.log(inputPrenom);
const inputEmail = document.getElementById('emailInput')
const inputPassword = document.getElementById('passwordInput')
const inputValidationPassword = document.getElementById('validatePasswordInput')
inputNom.addEventListener('keyup', validateForm);
inputPrenom.addEventListener('keyup', validateForm);
inputEmail.addEventListener('keyup', validateForm);
inputPassword.addEventListener('keyup', validateForm);
inputValidationPassword.addEventListener('keyup', validateForm);

function validateForm() {
    validateRequired(inputNom)
    validateRequired(inputPrenom)
}

function validateRequired(input){
    if(input.value.trim() !== ''){
        input.classList.add('is-valid')
        input.classList.remove('is-invalid')
    } else {
        input.classList.remove('is-valid')
        input.classList.add('is-invalid')
    }
}
let session = new Session();
session = session.getSession()


if(session !== ''){
    window.location.href = 'main.html'
}

if(session == '1'){
    window.location.href = 'admin.html'
}

if(session !== '1' && session !== ''){
    window.location.href = 'main.html'
}

let config = {
    'korisnicko_ime': {
        required: true,
        minlength: 5,
        maxlength: 50
    },

    'register_email': {
        email: true,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    'register_lozinka': {
        matching: 'ponovi_lozinku',
        required: true,
        minlength: 5,
        maxlength: 50
    },

    'ponovi_lozinku':{
        matching: 'register_lozinka',
        required: true,
        minlength: 5,
        maxlength: 50
    }
}

let validator = new Validator(config, '#registrationForm')

let btnLogins = document.querySelectorAll('#pop-up-login');
let overlay = document.querySelector('.overlay');
let popup = document.querySelector('.popup-modal');
let btnClose = document.querySelector('#closeModal');

let closeModal = () =>{
    overlay.style.display = 'none'
    popup.style.display = 'none'
}

btnLogins.forEach(btn=>{
    btn.addEventListener('click', e=>{
        e.preventDefault();

        overlay.style.display = 'block'
        popup.style.display = 'block'
    })
})

overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);

window.addEventListener('keydown', e=>{
    if(e.key === "Escape"){
        closeModal();
    }
})

// ------------------------

document.querySelector('#registrationForm').addEventListener('submit', e=>{
    e.preventDefault();

    if(validator.validationPassed()){
        let user = new User();
        user.username = document.querySelector('#korisnicko_ime').value
        user.email = document.querySelector('#email').value
        user.pasword = document.querySelector('#lozinka').value
        user.create()

    }else{
        alert('Fields are incorrectly filled');
    }

})

document.querySelector('#loginForm').addEventListener('submit', e=>{
    e.preventDefault();

    let user = new User();
    user.username = document.querySelector('#korisnicko_ime-login').value
    user.password = document.querySelector('#lozinka-login').value
    user.login()
    // user.loginAdmin();

})


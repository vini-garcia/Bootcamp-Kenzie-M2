import { toast } from "./render.js";
import { getUserType, login } from "./requests.js";

async function authentication() {
    const token = localStorage.getItem('@kenzieEmpresas:token');
    if (token) {
      const isAdmin = await getUserType(JSON.parse(token));
        if (isAdmin.is_admin) {
            window.location.replace('./adminPage.html');
        } else {
            window.location.replace('./userPageNC.html');
        }
      }
  }

export function handleLogin (){
    const emailInput = document.querySelector('.input__login--email');
    const passwordInput = document.querySelector('.input__login--password');
    const submitBtn = document.querySelector('.form--login > button');
    let count = 0;

    submitBtn.addEventListener('click', async (event) =>{
        event.preventDefault();
    
        if(emailInput.value == '' || passwordInput.value == ''){
            count++;
        }

        const loginBody ={
        email: emailInput.value,
        password: passwordInput.value
        };
        
        if(count != 0){
            count = 0;
            emailInput.value = '';
            passwordInput.value = '';
            toast('Todos os campos devem ser preenchidos', 'Por favor, preencha todos os campos', 'redLogin')
            return;
        } else {
            const token = await login(loginBody);
            emailInput.value = '';
            passwordInput.value = '';

            return token;
        }
    })
}

function handleBackToHomePageFromLogin (){
    const backBtn = document.querySelector('.homeBtn--login');

    backBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        window.location.replace('../../index.html');
    })
}

function handleGoToRegisterFromLogin (){
    const backBtn1 = document.querySelector('.signupBtn--login');
    const backBtn2 = document.querySelector('.signupBtn--main');

    backBtn1.addEventListener('click', (event) =>{
        event.preventDefault();
        window.location.replace('./register.html');        
    })

    backBtn2.addEventListener('click', (event) =>{
        event.preventDefault();
        window.location.replace('./register.html');        
    })
}

function openMenu(){
    const openMenu = document.querySelector('.menu__container--login > img');
    const btns = document.querySelector('header > nav');
    
    openMenu.addEventListener('click',async ()=>{
      if(!btns.id){
        btns.setAttribute('id', 'hiddenBtn');
        openMenu.src = '../assets/icons/X.svg';
    } else{
        btns.removeAttribute('id');
        openMenu.src = '../assets/icons/hamburguer-menu.svg';
      }
    })
  }

authentication();
handleLogin();
handleGoToRegisterFromLogin();
handleBackToHomePageFromLogin();
openMenu();
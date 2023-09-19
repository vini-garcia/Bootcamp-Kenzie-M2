import { toast } from "./render.js";
import { getUserType, newUser } from "./requests.js";

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

function handleBackToHomePageFromRegister (){
    const backBtn1 = document.querySelector('section > button');
    const backBtn2 = document.querySelector('.homeBtn--register');

    backBtn1.addEventListener('click', (event) =>{
        event.preventDefault();
        window.location.replace('../../index.html');
    })

    backBtn2.addEventListener('click', (event) =>{
        event.preventDefault();
        window.location.replace('../../index.html');
    })
}

function handleGoToLoginFromRegister (){
    const goToLoginBtn = document.querySelector('.loginBtn--register');

    goToLoginBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        window.location.replace('../pages/login.html');        
    })
}

function handleRegister (){
    const nameInput = document.querySelector('.input__register--name');
    const emailInput = document.querySelector('.input__register--email');
    const passwordInput = document.querySelector('.input__register--password');
    const profLevel = document.querySelector('.form--register > select')
    const submitBtn = document.querySelector('.form--register > button');
    let count = 0;

    submitBtn.addEventListener('click', async (event) =>{
        event.preventDefault();
        
        if(nameInput.value == '' || emailInput.value == '' || passwordInput.value == ''){
            count++;
        }

        const createBody ={
        username: nameInput.value,
        password: passwordInput.value,
        email: emailInput.value,
        professional_level: profLevel.value
    };
        if(count != 0){
            count = 0;
            nameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
            toast('Favor preencher todos os campos','Todos os campos devem ser preenchidos corretamente', 'redRegister')
            return;
        } else {
            const createUser = await newUser(createBody);
            nameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
            return createUser;
        }
    })
}

function openMenu(){
    const openMenu = document.querySelector('.menu__container--register > img');
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
handleBackToHomePageFromRegister();
handleGoToLoginFromRegister();
handleRegister();
openMenu();
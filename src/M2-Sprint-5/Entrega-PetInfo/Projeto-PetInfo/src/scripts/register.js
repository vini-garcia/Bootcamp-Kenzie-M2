import { toast } from "./render.js";
import { createUser } from "./requests.js";

function authentication() {
    const token = localStorage.getItem('@petInfo:token');
  
    if(token) {
      window.location.replace('./dashboard.html');
    }
  }

  
function handleBackToLogin (){
    const backBtn1 = document.querySelector('.data__container > div > button');
    const backBtn2 = document.querySelector('.data__container > button');

    backBtn1.addEventListener('click', (event) =>{
        event.preventDefault();
        window.location.replace('../../index.html');
    })

    backBtn2.addEventListener('click', (event) =>{
        event.preventDefault();
        window.location.replace('../../index.html');
    })
}

function handleRegister (){
    const userInput = document.querySelector('.user__container > input');
    const emailInput = document.querySelector('.email__container > input');
    const photoInput = document.querySelector('.photo__container > input');
    const passwordInput = document.querySelector('.password__container > input');
    const submitBtn = document.querySelector('.data__btn');
    let count = 0;

    submitBtn.addEventListener('click', async (event) =>{
        event.preventDefault();
        
        if(userInput.value == '' || emailInput.value == '' || photoInput.value == '' || passwordInput.value == ''){
            count++;
        }

        const createBody ={
        username: userInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        avatar: photoInput.value
    };
        if(count != 0){
            count = 0;
            userInput.value = '';
            emailInput.value = '';
            photoInput.value = '';
            passwordInput.value = '';
            toast('Por favor, preencha todos os campos', '', '', 'redRegister');
            return;
        } else {
            const newUser = await createUser(createBody);
            userInput.value = '';
            emailInput.value = '';
            photoInput.value = '';
            passwordInput.value = '';

            return newUser;
        }
    })
}


handleRegister();
handleBackToLogin();
authentication();
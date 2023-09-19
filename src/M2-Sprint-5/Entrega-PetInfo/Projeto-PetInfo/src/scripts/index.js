import { toast } from "./render.js";
import { getUserProfile, login } from "./requests.js";

function authentication() {
    const token = localStorage.getItem('@petInfo:token');
  
    if(token) {
      window.location.replace('./src/pages/dashboard.html');
    }
  }
  
export function handleLogin (){
    const emailInput = document.querySelector('.login__input--email');
    const passwordInput = document.querySelector('.login__input--password');
    const submitBtn = document.querySelector('.login__container > form > button');
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
            toast('Dados incorretos', 'Favor confirmar se os dados informados estão corretos', '', 'redLogin');
            return;
        } else {
            const token = await login(loginBody);
            emailInput.value = '';
            passwordInput.value = '';
            await getUserProfile()
            return token;
        }
    })
}

export function handleGoToRegister (){
    const signupBtn = document.querySelector('.signup__btn');

    signupBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        window.location.replace('./src/pages/register.html');
    })
}

authentication();
handleLogin();
handleGoToRegister();
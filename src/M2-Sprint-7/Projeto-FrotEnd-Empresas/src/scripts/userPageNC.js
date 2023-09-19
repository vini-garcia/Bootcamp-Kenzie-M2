import { renderCoworkers, renderEmployeeData } from "./render.js";
import { getUserType } from "./requests.js";

export function logOutUserPage() {
    const logOutBtn = document.querySelector('.logOutBtn--userPage');

    logOutBtn.addEventListener('click', ()=> {
        localStorage.clear();
        window.location.replace("../../index.html");
    })
}

async function authentication() {
    const token = localStorage.getItem('@kenzieEmpresas:token');
    if (token) {
        const isAdmin = await getUserType(JSON.parse(token));
       
        if (isAdmin.is_admin) {
            window.location.replace('./adminPage.html');
        } 
      } else {
        window.location.replace('./login.html');
      }
  }

authentication()  
logOutUserPage();
renderEmployeeData();
await renderCoworkers();

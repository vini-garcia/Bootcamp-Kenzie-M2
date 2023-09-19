import { renderAllCompanies, renderAllSectors } from "./render.js";
import { getAllCompanies, getAllCompaniesBySector, getAllSectors, getUserType } from "./requests.js";

async function authentication() {
    const token = localStorage.getItem('@kenzieEmpresas:token');
    if (token) {
      const isAdmin = await getUserType(JSON.parse(token));
      if (isAdmin.is_admin) {
        window.location.replace('./src/pages/adminPage.html');
      } else {
        window.location.replace('./src/pages/userPageNC.html');
    }
      }
  }

function handleGoToLoginFromIndex (){
    const goToLoginBtn = document.querySelector('.loginBtn--index');

    goToLoginBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        window.location.replace('./src/pages/login.html');        
    })
}

function handleGoToRegisterFromIndex (){
    const goToLoginBtn = document.querySelector('.signupBtn--index');

    goToLoginBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        window.location.replace('./src/pages/register.html');        
    })
}

function showSectorsList (){
  const ulList = document.querySelector('.selector__container > ul');
  const arrow = document.querySelector('.selector__container > img');
  const liList = document.querySelectorAll('.selector__container > ul > li');

  arrow.addEventListener('click', ()=>{
    if(!ulList.id){
      ulList.setAttribute('id', 'hidden');
    } else{
      ulList.removeAttribute('id');
    }

    liList.forEach(list =>{
      list.addEventListener('click', ()=>{
        ulList.setAttribute('id', 'hidden');
      })
    })
  })

}

export async function handleSelectedSector() {
  const allSectors = document.querySelectorAll('.sectors__list > p');
  
  allSectors.forEach(sector => {
    sector.addEventListener('click',async (e)=> {
      const option = e.target.innerText;
      const allOptions = await getAllCompaniesBySector(option);
      renderAllCompanies(allOptions);
    })
  })
}

function reloadSectors(){
  const text = document.querySelector('.selector__container > p');

  text.addEventListener('click',async ()=>{
    renderAllCompanies(await getAllCompanies());
  })
}

function openMenu(){
  const openMenu = document.querySelector('.menu__container--index > img');
  const btns = document.querySelector('header > nav');
  
  openMenu.addEventListener('click',async ()=>{
    if(!btns.id){
      btns.setAttribute('id', 'hiddenBtn');
      openMenu.src = './src/assets/icons/X.svg';
    } else{
      openMenu.src = './src/assets/icons/hamburguer-menu.svg';
      btns.removeAttribute('id');
    }
  })
}

authentication();
renderAllCompanies(await getAllCompanies());
handleGoToLoginFromIndex();
handleGoToRegisterFromIndex();
renderAllSectors(await getAllSectors());
showSectorsList();
handleSelectedSector();
reloadSectors();
openMenu();
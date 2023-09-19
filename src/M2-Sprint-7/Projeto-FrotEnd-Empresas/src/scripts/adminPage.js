import { handleModalNewDepartment } from "./modal.js";
import { renderDepartmentsAdminPage, renderEmployeesAdminPage, renderSelectAdminPage } from "./render.js";
import { getAllCompanies, getAllDepartments, getAllDepartmentsByCompany, getAllUsers, getUserType } from "./requests.js";

export function logOutAdminPage() {
    const logOutBtn = document.querySelector('.logOutBtn--adminPage');

    logOutBtn.addEventListener('click', ()=> {
        localStorage.clear();
        window.location.replace("../../index.html");
    })
}

async function findCompanySelected() {
    const select = document.querySelector('.department__container--adminPage > select')
    select.addEventListener('change', async()=>{
        const companyId = select.options[select.selectedIndex].dataset.companyId;
        
        if(companyId == undefined){
            await renderDepartmentsAdminPage(await getAllDepartments());
            return
        }

        renderDepartmentsAdminPage(await getAllDepartmentsByCompany(companyId))
        
        return companyId;
    })
}

async function authentication() {
    const token = localStorage.getItem('@kenzieEmpresas:token');
    if (token) {
        const isAdmin = await getUserType(JSON.parse(token));
       
        if (!isAdmin.is_admin) {
            window.location.replace('./userPageNC.html');
        }
      } else {
        window.location.replace('./login.html');
      }
  }

  const allCompanies = await getAllCompanies();  
  
  authentication();
  await renderSelectAdminPage(allCompanies);
  logOutAdminPage();
  findCompanySelected();
  await renderEmployeesAdminPage(await getAllUsers(), await getAllDepartments());
  await renderDepartmentsAdminPage(await getAllDepartments());
  handleModalNewDepartment()
//   startFunctions();
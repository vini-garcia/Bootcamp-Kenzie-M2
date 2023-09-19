import { getAllCompanies, getAllEmployeesByDepartment, getEmployeeProfile } from "./requests.js";
import { handleModalDeleteDepartment, handleModalDeleteEmployee, handleModalEditDepartment, handleModalEditEmployee, handleModalNewDepartment, handleModalUpdateEmployee, handleModalViewDepartment } from "./modal.js";

export function toast (title, message, color){
    const body = document.querySelector('body');

    const toastContainer = document.createElement('div');
    toastContainer.classList.add('toast__container', 'toast__add');

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title__container');

    const imageContainer = document.createElement('div');

    const toastImage = document.createElement('img');
    toastImage.src = "../assets/icons/check-solid.svg";
    toastImage.alt = "Check Icon";

    imageContainer.appendChild(toastImage);

    const toastTitle = document.createElement('h2');
    toastTitle.innerHTML = title;

    titleContainer.append(imageContainer, toastTitle);

    const toastText = document.createElement('small');
    toastText.innerHTML = message;

    toastContainer.append(titleContainer, toastText);

    body.appendChild(toastContainer);
    
    if(color == 'redLogin'){
        toastImage.src = "../assets/icons/error.svg";
        toastTitle.setAttribute('id', 'errorRed');
        imageContainer.setAttribute('id', 'errorRedBox');
        toastText.setAttribute('id', 'errorRed');
    }

    if(color == 'redRegister'){
        toastImage.src = "../assets/icons/error.svg";
        toastTitle.setAttribute('id', 'errorRed');
        imageContainer.setAttribute('id', 'errorRedBox');
        toastText.setAttribute('id', 'errorRed');
    }

    setTimeout(() => {
        toastContainer.classList.add('toast__remove');
      }, 5000)
    
      setTimeout(() => {
        body.removeChild(toastContainer);
      }, 6990);
}

export async function renderAllCompanies (companies){
    const ulList = document.querySelector('.ul__index');
    ulList.innerHTML = '';

    companies.forEach(company => {
      const card = createCardAllCompanies(company); 
      
      ulList.appendChild(card);
    })
}

function createCardAllCompanies(company) {
    const liContainer = document.createElement('li');

    const titleCompany = document.createElement('h2');
    titleCompany.innerText = company.name;

    const textCompany = document.createElement('span');
    textCompany.innerText = company.opening_hours;

    const sectorText = document.createElement('p');
    sectorText.innerText = company.sectors.description;

    liContainer.append(titleCompany, textCompany, sectorText);

    return liContainer;
}

export async function renderEmployeeData (){
    const mainContainer = document.querySelector('.data__container--userPage');

    mainContainer.innerHTML = '';

    const employee = await getEmployeeProfile();
    const card = createCardEmployeeData(employee); 
      
      mainContainer.appendChild(card);

      handleModalEditEmployee();
}

function createCardEmployeeData(employee) {
    if(employee.kind_of_work == null){
        employee.kind_of_work = 'Modalidade não definida'
    }
    
    const liContainer = document.createElement('div');
    liContainer.classList.add('liContainer--userPage');

    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container__employee');

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title__container--userPage');

    const employeeName = document.createElement('h1');
    employeeName.innerText = employee.username;

    titleContainer.appendChild(employeeName);

    const profileContainer = document.createElement('div');
    profileContainer.classList.add('profile__container--userPage');

    const emailText = document.createElement('p');
    emailText.setAttribute('id', 'emailProfile--userPage');
    emailText.innerText = employee.email;

    const positionText = document.createElement('p');
    positionText.innerText = employee.professional_level;

    const kindOfWorkText = document.createElement('p');
    kindOfWorkText.innerText = employee.kind_of_work;

    profileContainer.append(emailText, positionText, kindOfWorkText);

    mainContainer.append(titleContainer, profileContainer);

    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon__container--userPage');

    const iconPencil = document.createElement('img');
    iconPencil.src = '../assets/icons/purple-pencil.svg';
    iconPencil.alt = 'Purple Pencil';

    iconContainer.appendChild(iconPencil)

    mainContainer.append(titleContainer, profileContainer);

    liContainer.append(mainContainer, iconContainer);   
    
    return liContainer;
}

export function createModalUpdateEmployeeData (){
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal__container--userPage');

    const modalSection = document.createElement('section');

    const closeModalText = document.createElement('p');
    closeModalText.innerText = 'X';

    const titleModal = document.createElement('h1');
    titleModal.innerText = 'Editar Perfil';

    const modalForm = document.createElement('form');

    const modalInputName = document.createElement('input');
    modalInputName.setAttribute('class', 'inputName--userPage');
    modalInputName.setAttribute('type', 'text');
    modalInputName.setAttribute('placeholder', 'Seu nome');

    const modalInputEmail = document.createElement('input');
    modalInputEmail.setAttribute('class', 'inputEmail--userPage');
    modalInputEmail.setAttribute('type', 'email');
    modalInputEmail.setAttribute('placeholder', 'Seu email');

    const modalInputPassword = document.createElement('input');
    modalInputPassword.setAttribute('class', 'inputPassword--userPage');
    modalInputPassword.setAttribute('type', 'password');
    modalInputPassword.setAttribute('placeholder', 'Sua senha');

    const editBtn = document.createElement('button');
    editBtn.innerText ='Editar perfil';

    modalForm.append(modalInputName, modalInputEmail, modalInputPassword, editBtn);

    modalSection.append(closeModalText, titleModal, modalForm);

    modalContainer.appendChild(modalSection);

    return modalContainer;
}

export async function renderSelectAdminPage(companies) {
    const select = document.querySelector('.department__container--adminPage > select');

    companies.forEach(company => {
        
        const createdOption = createOption(company);

        select.appendChild(createdOption);
    })
} 

function createOption (company){
    const newOption = document.createElement('option');
    newOption.dataset.companyId = company.uuid;
    newOption.value = company.name;
    newOption.innerText = company.name;
    return newOption;
}

export async function renderDepartmentsAdminPage(departments) {
    const ulContainer = document.querySelector('.department__list--adminPage > ul');

    ulContainer.innerHTML = '';

    departments.forEach(department => {
        
        const createdDepartment = createDepartments(department);

        ulContainer.appendChild(createdDepartment);
    })
    handleModalDeleteDepartment();
    handleModalEditDepartment(departments);
    handleModalViewDepartment(departments);
} 

function createDepartments (department){
    const liContainer = document.createElement('li');

    const dataContainer = document.createElement('div');
    dataContainer.classList.add('dataDepartment__Container--adminPage');

    const departmentName = document.createElement('p');
    departmentName.setAttribute('id', 'departmentName--adminPage');
    departmentName.innerText = department.name;

    const departmentDescription = document.createElement('p');
    departmentDescription.innerText = department.description;

    const companyName = document.createElement('p');
    companyName.innerText = department.companies.name;

    dataContainer.append(departmentName, departmentDescription, companyName);

    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('imagesContainer1--adminPage');

    const imageEye = document.createElement('img');
    imageEye.src = '../assets/icons/purple-eye.svg';
    imageEye.alt = 'Purple Eye Icon';
    imageEye.classList.add('purpleEye--adminPage');
    imageEye.dataset.departmentId = department.uuid;

    const imagePencil = document.createElement('img');
    imagePencil.src = '../assets/icons/black-pencil.svg';
    imagePencil.alt = 'Black Pencil Icon';
    imagePencil.classList.add('blackPencil--adminPage');
    imagePencil.dataset.departmentId = department.uuid;

    const imageBin = document.createElement('img');
    imageBin.src = '../assets/icons/bin.svg';
    imageBin.alt = 'Bin Icon';
    imageBin.classList.add('bin--adminPage');
    imageBin.dataset.departmentId = department.uuid;
    imageBin.dataset.departmentName = department.name;

    imagesContainer.append(imageEye, imagePencil, imageBin);

    liContainer.append(dataContainer, imagesContainer);

    return liContainer;
}

export function createModalDeleteDepartment (departmentName){
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal__container--deleteDepartment');

    const closeModalBtn = document.createElement('p');
    closeModalBtn.innerText = 'X';

    const textDeleteModal = document.createElement('h2');
    textDeleteModal.innerText = `Realmente deseja deletar o departamento ${departmentName} e demitir seus funcionários?`;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Confirmar';

    modalContainer.append(closeModalBtn, textDeleteModal, deleteBtn);
    
    return modalContainer;
}

export function createModalUpdateDepartment (departmentId, departments){
    const departmentFound = departments.find(department => department.uuid == departmentId);

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal__container--updateDepartment');

    const closeModalBtn = document.createElement('p');
    closeModalBtn.innerText = 'X';

    const titleModal = document.createElement('h1');
    titleModal.innerText = 'Editar Departamento';

    const departmentForm = document.createElement('form');

    const departmentText = document.createElement('textarea');
    departmentText.innerText = departmentFound.description;
    departmentText.setAttribute('name', 'description');
    departmentText.setAttribute('cols', '30');
    departmentText.setAttribute('rows', '7');

    const saveBtn = document.createElement('button');
    saveBtn.innerText = 'Salvar alterações';
    saveBtn.dataset.departmentId = departmentFound.uuid;
    
    departmentForm.append(departmentText, saveBtn);

    modalContainer.append(closeModalBtn, titleModal, departmentForm);

    return modalContainer;
}

export async function renderEmployeesAdminPage(employees, departments) {
    const ulContainer = document.querySelector('.employee__list--adminPage > ul');

    ulContainer.innerHTML = '';
    employees.shift();
    employees.forEach(async employee => {
        const employeeDepartmentId = employee.department_uuid;
        const employeeDepartmentName = departments.find(department => department.uuid == employeeDepartmentId)
        let companyFound = '';
        if(employeeDepartmentName != undefined){
            companyFound = employeeDepartmentName.companies.name;
        }
        const createdEmployee = createEmployees(employee, companyFound);
        
        ulContainer.appendChild(createdEmployee);
    })
    handleModalUpdateEmployee(employees);
    handleModalDeleteEmployee();
    // handleModalNewDepartment();
} 

// export function startFunctions(){
//     handleModalNewDepartment();  
// }

function createEmployees (employee, departmentName){
    if(departmentName == ''){
        departmentName = 'Funcionário ainda não contratado'
    }

    const liContainer = document.createElement('li');

    const dataContainer = document.createElement('div');
    dataContainer.classList.add('dataContainer--adminPage');

    const employeeName = document.createElement('p');
    employeeName.innerText = employee.username;
    employeeName.setAttribute('id', 'employeeName--adminPage');

    const employeePosition = document.createElement('p');
    employeePosition.innerText = employee.professional_level;

    const companyName = document.createElement('p');
    companyName.innerText = departmentName;

    dataContainer.append(employeeName, employeePosition, companyName);

    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('imagesContainer--adminPage');

    const imagePencil = document.createElement('img');
    imagePencil.src = '../assets/icons/purple-pencil.svg';
    imagePencil.alt = 'Purple Pencil Icon';
    imagePencil.classList.add('PurplePencil--adminPage');
    imagePencil.dataset.employeeId = employee.uuid;

    const imageBin = document.createElement('img');
    imageBin.src = '../assets/icons/bin.svg';
    imageBin.alt = 'Bin Icon';
    imageBin.classList.add('binEmployee--adminPage');
    imageBin.dataset.employeeId = employee.uuid;
    imageBin.dataset.employeeName = employee.username;

    imagesContainer.append(imagePencil, imageBin);

    liContainer.append(dataContainer, imagesContainer);

    return liContainer;
}

export function createModalUpdateEmployee (employeeId, employees){
    const employeeFound = employees.find(employee => employee.uuid == employeeId);

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal__container--updateUser');

    const closeModalBtn = document.createElement('p');
    closeModalBtn.innerText = 'X';

    const titleModal = document.createElement('h1');
    titleModal.innerText = 'Editar Usuário';

    const employeesForm = document.createElement('form');

    const employeesSelectJob = document.createElement('select');
    employeesSelectJob.setAttribute('name', 'kindOfWork');
    employeesSelectJob.classList.add('employeesSelectJob');

    const optionEmpty = document.createElement('option');
    optionEmpty.setAttribute('value', 'selectKind');
    optionEmpty.innerText = 'Selecionar modalidade de trabalho';

    const optionHome = document.createElement('option');
    optionHome.setAttribute('value', 'home office');
    optionHome.innerText = 'Home office';

    const optionPresen = document.createElement('option');
    optionPresen.setAttribute('value', 'presencial');
    optionPresen.innerText = 'Presencial';

    const optionHybrid = document.createElement('option');
    optionHybrid.setAttribute('value', 'hibrido');
    optionHybrid.innerText = 'Híbrido';

    employeesSelectJob.append(optionEmpty, optionHome, optionPresen, optionHybrid);

    const employeesSelectPosition = document.createElement('select');
    employeesSelectPosition.setAttribute('name', 'position');
    employeesSelectPosition.classList.add('employeesSelectPosition');

    const optionEmptyPosition = document.createElement('option');
    optionEmptyPosition.setAttribute('value', 'selectPosition');
    optionEmptyPosition.innerText = 'Selecionar nível de trabalho';

    const optionEstagio = document.createElement('option');
    optionEstagio.setAttribute('value', 'estágio');
    optionEstagio.innerText = 'Estágio';

    const optionJunior = document.createElement('option');
    optionJunior.setAttribute('value', 'júnior');
    optionJunior.innerText = 'Júnior';

    const optionPleno = document.createElement('option');
    optionPleno.setAttribute('value', 'pleno');
    optionPleno.innerText = 'Pleno';

    const optionSenior = document.createElement('option');
    optionSenior.setAttribute('value', 'sênior');
    optionSenior.innerText = 'Sênior';

    employeesSelectPosition.append(optionEmptyPosition, optionEstagio, optionJunior, optionPleno, optionSenior);

    const updateBtn = document.createElement('button');
    updateBtn.innerText = 'Editar';
    updateBtn.dataset.employeeId = employeeFound.uuid;
    
    employeesForm.append(employeesSelectJob, employeesSelectPosition, updateBtn);

    modalContainer.append(closeModalBtn, titleModal, employeesForm);
    
    return modalContainer;
}

export function createModalDeleteEmployee (employeeName){
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal__container--deleteUser');

    const closeModalBtn = document.createElement('p');
    closeModalBtn.innerText = 'X';

    const textDelete = document.createElement('h2');
    textDelete.innerText = `Realmente deseja remover o usuário ${employeeName}?`

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Deletar';

    modalContainer.append(closeModalBtn, textDelete, deleteBtn);
        
    return modalContainer;
}

export function createModalNewDepartment() {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal__container--newDepartment');

    const closeModalBtn = document.createElement('p');
    closeModalBtn.innerText = 'X';

    const titleModal = document.createElement('h1');
    titleModal.innerText = 'Criar Departamento';

    const formModal = document.createElement('form');

    const inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('name', 'inputName');
    inputName.setAttribute('placeholder', 'Nome do departamento');
    inputName.classList.add('inputName--newDepartment');

    const inputText = document.createElement('input');
    inputText.setAttribute('type', 'text');
    inputText.setAttribute('name', 'inputText');
    inputText.setAttribute('placeholder', 'Descrição');
    inputText.classList.add('inputText--newDepartment');

    const selectCompanies = document.createElement('select');
    selectCompanies.setAttribute('name', 'companies');
    selectCompanies.classList.add('select--newDepartment');

    const optionEmpty = document.createElement('option');
    optionEmpty.setAttribute('value', 'emptyOption');
    optionEmpty.innerText = 'Selecionar empresa';

    selectCompanies.appendChild(optionEmpty);

    const createBtn = document.createElement('button');
    createBtn.innerText = 'Criar o departamento';
    createBtn.setAttribute('id', 'btnNewDepartment')

    formModal.append(inputName, inputText, selectCompanies, createBtn);

    modalContainer.append(closeModalBtn,titleModal, formModal);

    return modalContainer;
}

export async function renderSelectNewDepartmentAdminPage(companies) {
    const select = document.querySelector('.modal__container--newDepartment > form > select');
    
    companies.forEach(company => {
        
        const createdOption = createOptionNewDepartment(company);

        select.appendChild(createdOption);
    })
} 

function createOptionNewDepartment (company){
    const newOption = document.createElement('option');
    newOption.dataset.companyId = company.uuid;
    newOption.value = company.name;
    newOption.innerText = company.name;
    return newOption;
}

export function createModalOpenDepartment (departments, departmentId){
    const departmentFound = departments.find(department => department.uuid == departmentId);

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal__container--selectDepartment');

    const closeModalBtn = document.createElement('p');
    closeModalBtn.innerText = 'X';

    const titleModal = document.createElement('h1');
    titleModal.innerText = departmentFound.name;

    const departmentDataContainer= document.createElement('div');
    departmentDataContainer.classList.add('departmentData__mainContainer--selectDepartment');

    const dataContainer = document.createElement('div');
    dataContainer.classList.add('departmentData__container--selectDepartment');

    const textDepartment = document.createElement('h2');
    textDepartment.innerText = departmentFound.description;

    const company = document.createElement('p');
    company.innerText = departmentFound.companies.name;

    dataContainer.append(textDepartment,company);
    
    const employeesContainer= document.createElement('div');
    employeesContainer.classList.add('allUsers__container--selectDepartment');

    const employeesForm = document.createElement('form');

    const employeesSelect = document.createElement('select');
    employeesSelect.setAttribute('name', 'allUser');

    const employeesOption = document.createElement('option');
    employeesOption.setAttribute('value', 'emptyOption');
    employeesOption.innerText = 'Selecionar Usuário';

    employeesSelect.appendChild(employeesOption);

    const hireBtn = document.createElement('button');
    hireBtn.innerText = 'Contratar';

    employeesForm.append(employeesSelect, hireBtn)

    employeesContainer.appendChild(employeesForm);

    departmentDataContainer.append(dataContainer, employeesContainer);

    const employeesUl = document.createElement('ul');

    modalContainer.append(closeModalBtn, titleModal, departmentDataContainer, employeesUl);

    return modalContainer;
}

export async function renderSelectAllEmployeesAdminPage(users) {
    const select = document.querySelector('.allUsers__container--selectDepartment > form > select');
    users.forEach(user => {

        const createdOption = createOptionAllEmployees(user);

        select.appendChild(createdOption);
    })
} 

function createOptionAllEmployees (user){
    const newOption = document.createElement('option');
    newOption.dataset.employeeId = user.uuid;
    newOption.value = user.username;
    newOption.innerText = user.username;
    return newOption;
}

export async function renderEmployeesByDepartment (employees, companyName){
    const ulList = document.querySelector('.modal__container--selectDepartment > ul');

    ulList.innerHTML = '';

    employees.forEach(employee => {
      const card = createCardEmployees(employee, companyName); 
      
      ulList.appendChild(card);
    })
}

function createCardEmployees(employee, companyName) {
    const employeesLi = document.createElement('li');

    const employeesDataContainer = document.createElement('div');
    employeesDataContainer.classList.add('userData__container--selectDepartment');

    const employeeName = document.createElement('h3');
    employeeName.innerText = employee.username;

    const employeePosition = document.createElement('p');
    employeePosition.innerText = employee.professional_level;

    const employeeCompany = document.createElement('p');
    employeeCompany.innerText = companyName.companies.name;

    employeesDataContainer.append(employeeName, employeePosition, employeeCompany);

    const fireEmployeeContainer = document.createElement('div');
    fireEmployeeContainer.classList.add('fireBtn__container--selectDepartment');

    const firedEmployeeBtn = document.createElement('button');
    firedEmployeeBtn.innerText = 'Desligar';
    firedEmployeeBtn.dataset.employeeId = employee.uuid;

    fireEmployeeContainer.appendChild(firedEmployeeBtn);

    employeesLi.append(employeesDataContainer, fireEmployeeContainer);

    return employeesLi;
}

export async function renderCoworkers (){
    const getCoworkers = await getAllEmployeesByDepartment();
    if(getCoworkers == ''){
        const title = document.createElement('h1');
        title.innerText = 'Você ainda não foi contratado';
        title.classList.add('titleNoJob');
        const ancor = document.querySelector('.employees__container--userPage');
        ancor.classList.add('css__title');
        ancor.innerHTML = '';
        return ancor.appendChild(title);
    }

    const coworkers = getCoworkers[0].users;
    const department = getCoworkers[0].name;
    const companyId = getCoworkers[0].company_uuid;
    const allCompanies = await getAllCompanies();
    const companyFound = allCompanies.find(company => company.uuid == companyId)

    const mainContainer = document.querySelector('.employees__container--userPage');

    mainContainer.innerHTML = '';

    const dataMainContainer = document.createElement('div');

    const dataContainer = document.createElement('div');

    const titleDepartment = document.createElement('h1');
    titleDepartment.innerText = `${companyFound.name} - ${department}`;

    dataContainer.appendChild(titleDepartment);

    const ulContainer = document.createElement('ul');
    
    dataMainContainer.append(dataContainer, ulContainer);

    mainContainer.appendChild(dataMainContainer);
    
    coworkers.forEach(coworker => {
      const card = createCardCoworkers(coworker); 
      ulContainer.appendChild(card);
    })
}

function createCardCoworkers(coworker) {
    const liContainer = document.createElement('li');

    const titleCompany = document.createElement('h3');
    titleCompany.innerText = coworker.username;

    const textCompany = document.createElement('p');
    textCompany.innerText = coworker.professional_level;

    liContainer.append(titleCompany, textCompany);

    return liContainer;
}

export async function renderAllSectors(sectors) {
    const ulList = document.querySelector('.selector__container > ul');
    sectors.forEach(sector => {
        
        const createdOption = createSectors(sector);

        ulList.appendChild(createdOption);
    })
} 

function createSectors (sector){
    const liContainer = document.createElement('li');
    liContainer.classList.add('sectors__list');

    const textSector = document.createElement('p');
    textSector.innerText = sector.description;

    liContainer.appendChild(textSector);

    return liContainer
}
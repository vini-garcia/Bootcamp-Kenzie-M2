import { createModalDeleteDepartment, createModalDeleteEmployee, createModalNewDepartment, createModalOpenDepartment, createModalUpdateDepartment, createModalUpdateEmployee, createModalUpdateEmployeeData, renderEmployeeData, renderEmployeesAdminPage, renderEmployeesByDepartment, renderSelectAdminPage, renderSelectAllEmployeesAdminPage, renderSelectNewDepartmentAdminPage, toast } from "./render.js";
import { deleteDepartment, deleteUser, fireEmployee, getAllCompanies, getAllDepartments, getAllUsers, getUsersWithOutDepartment, hireNewEmployee, newDepartment, updateDepartment, updateEmployee, updateEmployeeProfile } from "./requests.js";

export function handleModalEditEmployee (){
    const modal = document.querySelector('.modal__controller');
    const modalOpenBtn = document.querySelector('.icon__container--userPage > img');
    
    modalOpenBtn.addEventListener('click', ()=>{
            modal.close();
            const modalContent = createModalUpdateEmployeeData();

            modal.innerHTML = '';

            modal.appendChild(modalContent);

            modal.showModal();
            
            closeModalEditEmployee();

            const modalEditBtn = document.querySelector('.modal__container--userPage > section > form > button');
            modalEditBtn.addEventListener('click', async(e)=>{
                e.preventDefault()
                const modalInputName = document.querySelector('.inputName--userPage');
                const modalInputEmail = document.querySelector('.inputEmail--userPage');
                const modalInputPassword = document.querySelector('.inputPassword--userPage');

                const userBody = {
                    "username": modalInputName.value,
                    "password": modalInputPassword.value,
                    "email": modalInputEmail.value
                  }
                        
                  await updateEmployeeProfile(userBody);
                  modal.close();
                  renderEmployeeData();                  
            })
        }) 
}

function closeModalEditEmployee (){
    const modal = document.querySelector('.modal__controller');
    const closeBtnOld = document.querySelector('.modal__container--userPage > section > p');

    closeBtnOld.addEventListener('click', (e)=>{
        e.preventDefault();
        modal.close();
    });
}

export function handleModalDeleteDepartment (){
    const modal = document.querySelector('.modal__controller');
    const modalOpenBtn = document.querySelectorAll('.bin--adminPage');
    
    modalOpenBtn.forEach(button =>{

        button.addEventListener('click', ()=>{
                modal.close();
                const modalContent = createModalDeleteDepartment(button.dataset.departmentName);
    
                modal.innerHTML = '';
    
                modal.appendChild(modalContent);
    
                modal.showModal();
                
                closeModalDeleteDepartment();
    
                const modalDeleteBtn = document.querySelector('.modal__container--deleteDepartment > button');
                modalDeleteBtn.addEventListener('click', async(e)=>{
                    e.preventDefault()
                    await deleteDepartment(button.dataset.departmentId);
                    modal.close();
                    const ulContainer = document.querySelector('.department__list--adminPage > ul');
                    ulContainer.innerHTML = '';
                    const select = document.querySelector('.department__container--adminPage > select')
                    select.value = 'emptyOption';

                    return
                })  
            })
    })
}

function closeModalDeleteDepartment (){
    const modal = document.querySelector('.modal__controller');
    const closeBtn = document.querySelector('.modal__container--deleteDepartment > p');

    closeBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        modal.close();
    });
}

export function handleModalEditDepartment (departments){
    const modal = document.querySelector('.modal__controller');
    const modalOpenBtn = document.querySelectorAll('.blackPencil--adminPage');
    
    modalOpenBtn.forEach(button =>{

        button.addEventListener('click', ()=>{
                modal.close();
                
                const modalContent = createModalUpdateDepartment(button.dataset.departmentId, departments);
    
                modal.innerHTML = '';
    
                modal.appendChild(modalContent);
    
                modal.showModal();
                
                closeModalUpdateDepartment();
    
                const modalUpdateBtn = document.querySelector('.modal__container--updateDepartment > form > button');
                modalUpdateBtn.addEventListener('click', async(e)=>{
                    e.preventDefault()
                    const modalTextArea = document.querySelector('.modal__container--updateDepartment > form > textarea');

                    const departmentBody = {
                        "description": modalTextArea.value                        
                      }

                    await updateDepartment(departmentBody, modalUpdateBtn.dataset.departmentId)
                    modal.close();
                    const ulContainer = document.querySelector('.department__list--adminPage > ul');
                    ulContainer.innerHTML = '';
                    const select = document.querySelector('.department__container--adminPage > select')
                    select.value = 'emptyOption';
                    
                    return
                })
            })
    })  
}

function closeModalUpdateDepartment (){
    const modal = document.querySelector('.modal__controller');
    const saveBtn = document.querySelector('.modal__container--updateDepartment > p');
    saveBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        modal.close();
    });
}

export function handleModalUpdateEmployee (employees){
    const modal = document.querySelector('.modal__controller');
    const modalOpenBtn = document.querySelectorAll('.PurplePencil--adminPage');
    
    modalOpenBtn.forEach(button =>{

        button.addEventListener('click', ()=>{
                modal.close();

                const modalContent = createModalUpdateEmployee(button.dataset.employeeId, employees);
    
                modal.innerHTML = '';
    
                modal.appendChild(modalContent);
    
                modal.showModal();
                
                closeModalUpdateEmployee();
    
                const modalUpdateBtn = document.querySelector('.modal__container--updateUser > form > button');
                modalUpdateBtn.addEventListener('click', async(e)=>{
                    e.preventDefault()
                    const modalSelectKind = document.querySelector('.employeesSelectJob');
                    const modalSelectPosition = document.querySelector('.employeesSelectPosition');
                    let employeeBody ={

                    }

                    if(modalSelectKind.value == 'selectKind' && modalSelectPosition.value == 'selectPosition'){
                        toast('Campos em branco', 'Escolha ao menos uma opção', 'redLogin')
                        
                        return
                    } else if(modalSelectKind.value != 'selectKind' && modalSelectPosition.value != 'selectPosition'){
                        employeeBody = {
                            "kind_of_work": modalSelectKind.value,
                            "professional_level": modalSelectPosition.value
                          }

                    } else if(modalSelectKind.value == 'selectKind' && modalSelectPosition.value != 'selectPosition'){
                        employeeBody = {
                            "professional_level": modalSelectPosition.value
                        }
                    } else if(modalSelectPosition.value == 'selectPosition' && modalSelectKind.value != 'selectKind'){
                        
                        employeeBody = {
                            "kind_of_work": modalSelectKind.value
                        }
                    }
                    
                    await updateEmployee(employeeBody, modalUpdateBtn.dataset.employeeId);
                    modal.close();
                 
                    await renderEmployeesAdminPage(await getAllUsers(), await getAllDepartments());
                                    
                    return
                })  
            })
    })
}

function closeModalUpdateEmployee (){
    const modal = document.querySelector('.modal__controller');
    const saveBtn = document.querySelector('.modal__container--updateUser > p');
    saveBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        modal.close();
    });
}

export function handleModalDeleteEmployee (){
    const modal = document.querySelector('.modal__controller');
    const modalOpenBtn = document.querySelectorAll('.binEmployee--adminPage');
    
    modalOpenBtn.forEach(button =>{

        button.addEventListener('click', ()=>{
                modal.close();
                
                const modalContent = createModalDeleteEmployee(button.dataset.employeeName);
    
                modal.innerHTML = '';
    
                modal.appendChild(modalContent);
    
                modal.showModal();
                
                closeModalDeleteEmployee();
    
                const modalDeleteBtn = document.querySelector('.modal__container--deleteUser > button');
                modalDeleteBtn.addEventListener('click', async(e)=>{
                    e.preventDefault()
                    await deleteUser(button.dataset.employeeId);
                    modal.close();
                    await renderEmployeesAdminPage(await getAllUsers(), await getAllDepartments());
                    return
                })
            })
    })   
}

function closeModalDeleteEmployee (){
    const modal = document.querySelector('.modal__controller');
    const closeBtn = document.querySelector('.modal__container--deleteUser > p');

    closeBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        modal.close();
    });
}

export async function handleModalNewDepartment (){
    const modal = document.querySelector('.modal__controller');
    const modalOpenBtn = document.querySelector('.department__container--adminPage > div');

    modalOpenBtn.addEventListener('click', async(event)=>{
                event.preventDefault()
                console.log(modalOpenBtn.addEventListener.target)
                modal.close();
                const modalContent = createModalNewDepartment();
                modal.innerHTML = '';
                modal.appendChild(modalContent);
                
                await renderSelectNewDepartmentAdminPage(await getAllCompanies());
                modal.close();
                modal.showModal();
                closeModalNewDepartment()
            
                const nameInput = document.querySelector('.inputName--newDepartment');
                const textInput = document.querySelector('.inputText--newDepartment');
                const select = document.querySelector('.select--newDepartment');
                let departmentBody = {
                    "name": 'string',
                    "description": 'string',
                    "company_uuid": 'string'
                }
                select.addEventListener('change', async(event)=>{
                    event.preventDefault()
                const companyId = select.options[select.selectedIndex].dataset.companyId;
                const modalNewBtn = document.querySelector('#btnNewDepartment');

                departmentBody = {
                    "name": nameInput.value,
                    "description": textInput.value,
                    "company_uuid": companyId
                }    
                modalNewBtn.addEventListener('click', async(e)=>{
                    e.preventDefault()
                   
                    await newDepartment(departmentBody);
                    const ulContainer = document.querySelector('.department__list--adminPage > ul');
                        ulContainer.innerHTML = '';
                    const select = document.querySelector('.department__container--adminPage > select')
                        select.value = 'emptyOption';
                    modal.close();
                    return;
                   })
                    return;
                   })

                const modalNewBtn = document.querySelector('#btnNewDepartment');
               
                modalNewBtn.addEventListener('click', async(e)=>{
                    e.preventDefault()
                  
                    const modalController2 = document.querySelector('.modal__controller');
                    const inputs = modalController2.querySelectorAll('input');
                    for (let i = 0; i < inputs.length; i++) {
                        let input = inputs[i];
                        if (input.value === '') {
                            toast('Favor preencher todos os campos', 'Todos os campos são obrigatórios', 'redLogin');
                            modal.close();
                            departmentBody = {};
                            return;
                        }     
                        return;               
                      }
                      
                      if(select.value == 'emptyOption'){
                        toast('Favor preencher todos os campos', 'Todos os campos são obrigatórios', 'redLogin')
                        modal.close();  
                        departmentBody = {};
                        return;
                      }
                      return;
                   })
                   return;
            })            
            return;          
}

function closeModalNewDepartment() {
    const modal = document.querySelector('.modal__controller');
    const closeBtn = document.querySelector('.modal__container--newDepartment > p');

    closeBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        modal.close();
    });
}

export function handleModalViewDepartment(departments) {
    const modal = document.querySelector('.modal__controller');
    const modalOpenBtn = document.querySelectorAll('.purpleEye--adminPage');
    
    modalOpenBtn.forEach(button =>{

        button.addEventListener('click', async ()=>{
                modal.close();
                
                const modalContent = createModalOpenDepartment(departments, button.dataset.departmentId);
                modal.innerHTML = '';
    
                modal.appendChild(modalContent);
    
                modal.showModal();
                renderSelectAllEmployeesAdminPage(await getUsersWithOutDepartment());

                const allUsers = await getAllUsers();
                const usersFound = allUsers.filter(user => user.department_uuid == button.dataset.departmentId);

                const departmentFound = departments.find(department => department.uuid == button.dataset.departmentId);

                renderEmployeesByDepartment(usersFound, departmentFound);

                closeModalViewDepartment();

                const select = document.querySelector('.allUsers__container--selectDepartment > form > select');
                select.addEventListener('change', async(event)=>{
                    event.preventDefault()
                const employeeId = select.options[select.selectedIndex].dataset.employeeId;
                const modalHireBtn = document.querySelector('.allUsers__container--selectDepartment > form > button');
                const employeeBody = {
                    "user_uuid": employeeId,
                    "department_uuid": button.dataset.departmentId
                  }
                modalHireBtn.addEventListener('click', async(e)=>{
                    e.preventDefault()

                     await hireNewEmployee(employeeBody);
                     await renderEmployeesAdminPage(await getAllUsers(), await getAllDepartments());
                    modal.close();
                   })
                   })    
                   await renderEmployeesAdminPage(await getAllUsers(), await getAllDepartments())
                   const modalFireBtn = document.querySelectorAll('.fireBtn__container--selectDepartment > button');
                   
                   modalFireBtn.forEach(fireBtn => {
                    fireBtn.addEventListener('click', async(e)=>{
                        e.preventDefault();
                        
                        await fireEmployee(fireBtn.dataset.employeeId);
                        await renderEmployeesAdminPage(await getAllUsers(), await getAllDepartments());
                        
                        modal.close();
                       })
                   })   
            })
    })  
}

function closeModalViewDepartment (){
    const modal = document.querySelector('.modal__controller');
    const saveBtn = document.querySelector('.modal__container--selectDepartment > p');
    saveBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        modal.close();
    });
}
import { toast } from "./render.js";

const baseURL = 'http://localhost:6278';
const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token")) || "";
const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
};

export async function newUser (userBody){
    const user = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(userBody)
    }).then((response) =>{
        if(response.ok){
            toast('Usuário criado com sucesso', 'Você agora pode logar em nosso sistema')
            setTimeout(() => {
                window.location.replace('../pages/login.html');
              }, 5000)
            
            return response.json();
        } else {
            response.json().then(({error}) => {
                if(error[0] == 'professional_level must be one of these: estágio, júnior, pleno, sênior'){
                    toast('Todos os campos são obrigatórios', 'Favor informar seu nível profissional', 'redLogin')
                }
                if(error[0] == 'email alread exists!'){
                    toast('O email informado já está em uso', 'Favor informar outro endereço de email', 'redLogin')
                }
            })
        }
    })
    return user;
}

export async function login (loginBody){
    const token = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    }).then(async(response) =>{
        if(response.ok){
            const userToken = response.json().then(async(responseJson) => {
                localStorage.setItem(
                    "@kenzieEmpresas:token",
                    JSON.stringify(responseJson.token)
                )
                const isAdmin = await getUserType(responseJson.token);
                    if (isAdmin.is_admin) {
                    window.location.replace('../pages/adminPage.html');
                    } else {
                    window.location.replace('../pages/userPageNC.html');
                    }
                return responseJson;
            })
            return userToken;
        } else {
            response.json().then(({error}) => {
                toast('Email e/ou senha inválido', 'Favor verificar e tentar novamente', 'redLogin')
            })
        }
    })
    return token;
}

export async function getAllCompanies (){
    const allCompanies = await fetch(`${baseURL}/companies`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            
            return response.json();
        } else {
            response.json().then((responseError) => {
        
            })
        }
    })             
    return allCompanies;
}

export async function getAllCompaniesBySector (sector){
    const companiesBySector = await fetch(`${baseURL}/companies/${sector}`, {
        method: "GET",
        headers: requestHeaders,
    }).then((response) =>{
        if(response.ok){
            
            return response.json();
        } else {
            response.json().then((responseError) => {
            
            })
        }
    })
    return companiesBySector;
}

export async function getAllSectors (){
    const allSectors = await fetch(`${baseURL}/sectors`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            
            return response.json();
        } else {
            response.json().then((responseError) => {
                
            })
        }
    })
    return allSectors;
}

export async function getEmployeeProfile (){
    const employeeProfile = await fetch(`${baseURL}/users/profile`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            
            return response.json();
        } else {
            response.json().then((responseError) => {

            })
        }
    })
    return employeeProfile;
}

export async function getAllEmployeesByDepartment (){
    const employeesByDepartments = await fetch(`${baseURL}/users/departments/coworkers`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){

            return response.json();
        } else {
            response.json().then((responseError) => {
            
            })
        }
    })
    return employeesByDepartments;
}

export async function getCompanyDepartmentByEmployee (){
    const companyDepartmentEmployee = await fetch(`${baseURL}/users/departments`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
        
            return response.json();
        } else {
            response.json().then((responseError) => {
                
            })
        }
    })
    return companyDepartmentEmployee;
}

export async function updateEmployeeProfile (userBody){
    const updateEmployee = await fetch(`${baseURL}/users`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(userBody)
    }).then((response) =>{
        if(response.ok){
            toast('Perfil editado com sucesso', 'As novas infomações já estão em nosso sistema')

            return response.json();
        } else {
            response.json().then((responseError) => {
            
            })
        }
    })
    return updateEmployee;
}

export async function newCompany (companyBody){
    const company = await fetch(`${baseURL}/companies`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(companyBody)
    }).then((response) =>{
        if(response.ok){
          
            return response.json();
        } else {
            response.json().then((responseError) => {
        
            })
        }
    })
    return company;
}

export async function getAllDepartments (){
    const allDepartments = await fetch(`${baseURL}/departments`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
           
            return response.json();
        } else {
            response.json().then((responseError) => {
             
            })
        }
    })
    return allDepartments;
}

export async function getAllDepartmentsByCompany (companyId){
    const allDepartmentsByCompany = await fetch(`${baseURL}/departments/${companyId}`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            
            return response.json();
        } else {
            response.json().then((responseError) => {
              
            })
        }
    })
    return allDepartmentsByCompany;
}

export async function newDepartment (departmentBody){
    const department = await fetch(`${baseURL}/departments`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(departmentBody)
    }).then((response) =>{
        if(response.ok){
            toast('Departamento criado com sucesso', 'O novo departamento já consta na empresa selecionada')
            return;
        } else {
            response.json().then((responseError) => {
                console.log(responseError)
            })
        }
    })
    return department;
}

export async function hireNewEmployee (employeeBody){
    const newEmployee = await fetch(`${baseURL}/departments/hire/`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(employeeBody)
    }).then((response) =>{
        if(response.ok){
            toast('Funcionário contratado com sucesso', 'O referido funcionário já consta em nosso sistema como ativo')

            return response.json();
        } else {
            response.json().then((responseError) => {
                
            })
        }
    })
    return newEmployee;
}

export async function fireEmployee (employeeId){
    const firedEmployee = await fetch(`${baseURL}/departments/dismiss/${employeeId}`, {
        method: "PATCH",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            toast('Funcionário demitido com sucesso', 'Este funcionário não pertence mais a este departamento')

            return response.json();
        } else {
            response.json().then((responseError) => {
                
            })
        }
    })
    return firedEmployee;
}

export async function updateDepartment (departmentBody, departmentId){
    const updatedDepartment = await fetch(`${baseURL}/departments/${departmentId}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(departmentBody)
    }).then((response) =>{
        if(response.ok){
            toast('Departamento editado com sucesso', 'Os novos dados já constam em nosso sistema')

            return response.json();
        } else {
            response.json().then((responseError) => {
              
            })
        }
    })
    return updatedDepartment;
}

export async function deleteDepartment (departmentId){
    const deletedDepartment = await fetch(`${baseURL}/departments/${departmentId}`, {
        method: "DELETE",
        headers: requestHeaders,
    }).then((response) =>{
        if(response.ok){
            toast('Departamento deletado com sucesso', 'O referido departamento fora excluído do nosso sistema')

            return;
        } else {
            response.json().then((responseError) => {
               
            })
        }
    })
    return deletedDepartment;
}

export async function getAllUsers (){
    const allUsers = await fetch(`${baseURL}/users`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
           
            return response.json();
        } else {
            response.json().then((responseError) => {
             
            })
        }
    })
    return allUsers;
}

export async function getUsersWithOutDepartment (){
    const usersWithOutDepartment = await fetch(`${baseURL}/admin/out_of_work`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            
            return response.json();
        } else {
            response.json().then((responseError) => {
              
            })
        }
    })
    return usersWithOutDepartment;
}

export async function updateEmployee (employeeBody, employeeId){
    const updatedEmployee = await fetch(`${baseURL}/admin/update_user/${employeeId}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(employeeBody)
    }).then((response) =>{
        if(response.ok){
            toast('Dados de usuário atualizados com sucesso', 'Os novos dados já constam em nosso sistema')

            return response.json();
        } else {
            response.json().then((responseError) => {
                
            })
        }
    })
    return updatedEmployee;
}

export async function deleteUser (userId){
    const deletedUser = await fetch(`${baseURL}/admin/delete_user/${userId}`, {
        method: "DELETE",
        headers: requestHeaders,
    }).then((response) =>{
        if(response.ok){
            toast('Usuário deletado com sucesso', 'O referido usuário já não consta em nosso sistema')

            return;
        } else {
            response.json().then((responseError) => {
                
            })
        }
    })
    return deletedUser;
}

export async function getUserType (userId){
    const userType = await fetch(`${baseURL}/auth/validate_user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userId}`
        }
    }).then((response) =>{
        if(response.ok){
            
            return response.json();
        } else {
            response.json().then((responseError) => {
                console.log(responseError)
            })
        }
    })
    return userType;
}
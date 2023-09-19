import { renderPerfilPhoto, toast, showLogout } from "./render.js";

const baseURL = 'http://localhost:3333';
const token = JSON.parse(localStorage.getItem("@petInfo:token")) || "";
const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
};

export async function login (loginBody) {  
    const token = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    }).then((response) =>{
        if(response.ok){
           const userToken = response.json().then((responseJson) =>{
            localStorage.setItem(
                "@petInfo:token",
                JSON.stringify(responseJson.token)
            )
            window.location.replace('./src/pages/dashboard.html');
            
            return responseJson;
           })
           return userToken;
        } else {
            response.json().then((responseError) =>{
                toast('Email e/ou senha incorreto', 'Favor tentar novamente', '', 'red');
            })
        }
    })
    return token;
}

export async function createUser (createBody){
    const newUser = await fetch(`${baseURL}/users/create`,{
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(createBody)
    }).then((response)=>{
        if(response.ok){
            toast('Sua conta foi criada com sucesso!', 'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: ', "../../index.html" )
            
            setTimeout(() => {
                window.location.replace('../../index.html');
              }, 5000)
            
            return response.json();
        } else {
            response.json().then((responseError) =>{
            })
        }
    })
    return newUser;
}

export async function getAllPosts (){
    const allPosts = await fetch(`${baseURL}/posts`, {
        method: "GET",
        headers: requestHeaders
    }).then((response) => response.json())

    return allPosts;
}

export async function updatePost (postBody, postId){
    const updated = await fetch(`${baseURL}/posts/${postId}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify(postBody)
    }).then((response) =>{
        if(response.ok){
            toast('Post editado com sucesso!','O post agora contém as novas informações passadas');
            return response.json();
        } else {
            response.json().then((responseError) =>{
            })
        } 
    })

    return updated;
}

export async function deletePost (postId){
    const deleted = await fetch(`${baseURL}/posts/${postId}`, {
        method: "DELETE",
        headers: requestHeaders
    }).then((response) =>{
        if(response.ok){
            toast('Post deletado com sucesso!','O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed');
            
            return response.json();
        } else {
            response.json().then((responseError) =>{
            })
        } 
    })

    return deleted;
}

export async function createPost (postBody){
    const newPost = await fetch(`${baseURL}/posts/create`,{
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(postBody)
    }).then((response)=>{
        if(response.ok){
            toast('Post criado com sucesso!','Seu post foi criado com sucesso, a partir de agora ele aparecerá no seu feed')

            return response.json();
        } else {
            response.json().then((responseError) =>{
            })
        }
    })
    return newPost;
}
        export async function getUserProfile (){
            const userProfile = await fetch(`${baseURL}/users/profile`, {
                method: "GET",
                headers: requestHeaders
            }).then((response) =>{
                if(response.ok){
                    const userData = response.json().then((responseJson) =>{
                        localStorage.setItem(
                            "@petInfo:data",
                            JSON.stringify(responseJson)
                        )
                        
                        return responseJson;
                       }).then(async(res) =>{
                        await renderPerfilPhoto();
                        showLogout();                       
                       })
                } else {
                    response.json().then((responseError) =>{
                    })
                }
            })
        
            return userProfile;
        }
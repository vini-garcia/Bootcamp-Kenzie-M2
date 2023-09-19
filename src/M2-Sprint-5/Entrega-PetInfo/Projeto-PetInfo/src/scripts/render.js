import { handleModalDelete, handleModalEdit, handleModalNewPost, handleModalOld } from "./modal.js";
import { getAllPosts } from "./requests.js";

const userData = JSON.parse(localStorage.getItem("@petInfo:data")) || "";

export async function render (){
    const ulList = document.querySelector('ul');

    ulList.innerHTML = '';

    const posts = await getAllPosts();
    
    posts.forEach(post => {
        const card = createCard(post);

        ulList.appendChild(card);
    });
    handleModalOld(posts);
    handleModalDelete(posts);
    handleModalEdit(posts);
    handleModalNewPost(posts);
}

 export function createCard (post){
    const userData3 = JSON.parse(localStorage.getItem("@petInfo:data")) || "";
    const liContainer = document.createElement('li');

    const articleContainer = document.createElement('article');

    const profileContainer = document.createElement('div');
    profileContainer.classList.add('profile__container');

    const dataContainer = document.createElement('div');
    dataContainer.classList.add('data__container');

    const image = document.createElement('img');
    image.src = post.user.avatar;
    image.alt = post.user.username;

    const paragraphName = document.createElement('p');
    paragraphName.innerText = post.user.username;

    const span = document.createElement('span');
    span.innerText = '|';

    const small = document.createElement('small');
    const options = {month: 'long', year: 'numeric'};
    small.innerHTML = new Date(post.createdAt).toLocaleDateString("pt-BR", options);

    dataContainer.append(image, paragraphName, span, small);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn__container');

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit__btn');
    editBtn.innerText = 'Editar';
    editBtn.dataset.postId = post.id;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete__btn');
    deleteBtn.innerText = 'Excluir';
    deleteBtn.dataset.postId = post.id;

    btnContainer.append(editBtn, deleteBtn);
    
    if(post.user.id != userData3.id){
        btnContainer.removeChild(editBtn);
        btnContainer.removeChild(deleteBtn);
    }
    
    profileContainer.append(dataContainer, btnContainer);
    
    const textContainer = document.createElement('div');
    textContainer.classList.add('text__container');

    const h1 = document.createElement('h1');
    h1.innerHTML = post.title;

    const paragraphText = document.createElement('p');
    
    if(post.content.length < 145){
        paragraphText.innerHTML = post.content;    
    } else {
        paragraphText.innerHTML = `${post.content.substring(0, 145)}...`;
    }

    const ancor = document.createElement('button');
    ancor.innerText = 'Acessar publicação';
    ancor.dataset.postId = post.id;

    textContainer.append(h1, paragraphText, ancor);

    articleContainer.append(profileContainer, textContainer);

    liContainer.appendChild(articleContainer);

    return liContainer;
}

export function toast (title, message, link, color){
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

    const toastAncor = document.createElement('a');
    toastAncor.href = link;
    toastAncor.innerText = "Acessar página de login";

    toastText.appendChild(toastAncor);

    if(title != 'Sua conta foi criada com sucesso!'){
        toastText.removeChild(toastAncor);
    }
    
    toastContainer.append(titleContainer, toastText);

    body.appendChild(toastContainer);
    
    if(color == 'red'){
        toastImage.src = "./src/assets/icons/error.svg";
        toastTitle.setAttribute('id', 'errorRed');
        imageContainer.setAttribute('id', 'errorRedBox');
    }

    if(color == 'redLogin'){
        toastImage.src = "./src/assets/icons/error.svg";
        toastTitle.setAttribute('id', 'errorRed');
        imageContainer.setAttribute('id', 'errorRedBox');
    }
    
    if(color == 'redRegister'){
        toastImage.src = "../assets/icons/error.svg";
        toastTitle.setAttribute('id', 'errorRed');
        imageContainer.setAttribute('id', 'errorRedBox');
    }

    setTimeout(() => {
        toastContainer.classList.add('toast__remove')
      }, 5000)
    
      setTimeout(() => {
        body.removeChild(toastContainer)
      }, 6990);
}

export function createModalOld (id, array){
    const modalContainer = document.createElement('div');
    const modalProfileContainer = document.createElement('div');
    const modalDataContainer = document.createElement('div');
    const modalImage = document.createElement('img');
    const modalParagraphName = document.createElement('p');
    const modalSpan = document.createElement('span');
    const modalSmall = document.createElement('small');
    const modalBtnContainer = document.createElement('div');
    const modalBtn = document.createElement('button');
    const modalTextContainer = document.createElement('div');
    const modalH1 = document.createElement('h1');
    const modalParagraphText = document.createElement('p');
    
    const postFound = array.find(post => post.id == id);
    modalContainer.classList.add('modal__container--oldPosts');
    modalProfileContainer.classList.add('modal__profile__container--oldPosts');
    modalDataContainer.classList.add('modal__data__container--oldPosts');
    modalImage.src = postFound.user.avatar;
    modalImage.alt = postFound.user.username;
    modalParagraphName.innerHTML = postFound.user.username;
    modalSpan.innerText = '|';
    const options = {month: 'long', year: 'numeric'};
    modalSmall.innerHTML = new Date(postFound.createdAt).toLocaleDateString("pt-BR", options);
    
    modalDataContainer.append(modalImage, modalParagraphName, modalSpan, modalSmall);
    
    modalBtnContainer.classList.add('modal__btn__container--oldPosts');
    modalBtn.innerText = 'X';
    
    modalBtnContainer.appendChild(modalBtn);

    modalProfileContainer.append(modalDataContainer, modalBtnContainer);
    
    modalTextContainer.classList.add('modal__text__container--oldPosts');
    modalH1.innerHTML = postFound.title;
    modalParagraphText.innerText = postFound.content;

    modalTextContainer.append(modalH1, modalParagraphText);

    modalContainer.append(modalProfileContainer, modalTextContainer);

    return modalContainer;
}

export function createModalNewPost (id, array){
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal__container--newPosts');
   
    const modalProfileContainer = document.createElement('div');
    modalProfileContainer.classList.add('modal__profile__container--newPosts');
    
    const modalH1 = document.createElement('h1');
    modalH1.innerText = 'Criando novo post';

    const modalCloseBtn = document.createElement('button');
    modalCloseBtn.innerText = 'X';
    
    modalProfileContainer.append(modalH1, modalCloseBtn);

    const modalTextAreaContainer = document.createElement('div');
    
    const modalForm = document.createElement('form');
    
    const modalTitleContainer = document.createElement('div');
    modalTitleContainer.classList.add('modal__title__container--newPosts');
    
    const modalLabelTitle = document.createElement('label');
    modalLabelTitle.setAttribute('for', 'title');
    modalLabelTitle.innerText = 'Título do post';
    
    const modalTextAreaTitle = document.createElement('textarea');
    modalTextAreaTitle.setAttribute('name', 'title');
    modalTextAreaTitle.setAttribute('cols', '90');
    modalTextAreaTitle.setAttribute('rows', '1');
    modalTextAreaTitle.setAttribute('placeholder', 'Digite o título aqui...');
    
    modalTitleContainer.append(modalLabelTitle, modalTextAreaTitle);
    
    const modalTextContainer = document.createElement('div');
    modalTextContainer.classList.add('modal__text__container--newPosts');
    
    const modalLabelText = document.createElement('label');
    modalLabelText.setAttribute('for', 'text');
    modalLabelText.innerText = 'Conteúdo do post';
    
    const modalTextAreaText = document.createElement('textarea');
    modalTextAreaText.setAttribute('name', 'text');
    modalTextAreaText.setAttribute('cols', '90');
    modalTextAreaText.setAttribute('rows', '10');
    modalTextAreaText.setAttribute('wrap', 'soft');
    modalTextAreaText.setAttribute('placeholder', 'Desenvolva o conteúdo do post aqui...');
    
    modalTextContainer.append(modalLabelText, modalTextAreaText);

    const modalBtnContainer = document.createElement('div');
    modalBtnContainer.classList.add('modal__btn__container--newPosts');

    const modalCancelPost = document.createElement('button');
    modalCancelPost.classList.add('cancel__btn__newPost');
    modalCancelPost.innerText = 'Cancelar';

    const modalSendPost = document.createElement('button');
    modalSendPost.classList.add('send__btn');
    modalSendPost.innerText = 'Publicar';

    modalBtnContainer.append(modalCancelPost, modalSendPost);
    
    modalForm.append(modalTitleContainer, modalTextContainer, modalBtnContainer);

    modalTextAreaContainer.appendChild(modalForm);

    modalContainer.append(modalProfileContainer, modalTextAreaContainer);

    return modalContainer;
}

export function createModalDelete (id, array){
    const postFound = array.find(post => post.id == id);

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal__container--deletePosts');
   
    const modalProfileContainer = document.createElement('div');
    modalProfileContainer.classList.add('modal__profile__container--deletePosts');
    
    const modalH2 = document.createElement('h2');
    modalH2.innerText = 'Confirmação de exclusão';

    const modalCloseBtn = document.createElement('button');
    modalCloseBtn.innerText = 'X';
    
    modalProfileContainer.append(modalH2, modalCloseBtn);
    
    const modalTextContainer = document.createElement('div');
    modalTextContainer.classList.add('modal__text__container--deletePosts');
    
    const modalH1 = document.createElement('h1');
    modalH1.innerText = 'Tem certeza que deseja excluir este post?';

    const modalp = document.createElement('p');
    modalp.innerText = 'Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir';

    modalTextContainer.append(modalH1, modalp);

    const modalBtnContainer = document.createElement('div');
    modalBtnContainer.classList.add('modal__btn__container--deletePosts');

    const modalCancelPost = document.createElement('button');
    modalCancelPost.classList.add('cancel__btn__deletePosts');
    modalCancelPost.innerText = 'Cancelar';

    const modalSendPost = document.createElement('button');
    modalSendPost.classList.add('confirm__btn');
    modalSendPost.innerText = 'Sim, excluir este post';
    modalSendPost.dataset.postId = postFound.id;

    modalBtnContainer.append(modalCancelPost, modalSendPost);

    modalContainer.append(modalProfileContainer, modalTextContainer, modalBtnContainer);

    return modalContainer;
}

export function createModalEditPost (id, array){
    const postFound = array.find(post => post.id == id);
    
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal__container--editPosts');
   
    const modalProfileContainer = document.createElement('div');
    modalProfileContainer.classList.add('modal__profile__container--editPosts');
    
    const modalH1 = document.createElement('h1');
    modalH1.innerText = 'Edição';

    const modalCloseBtn = document.createElement('button');
    modalCloseBtn.innerText = 'X';
    
    modalProfileContainer.append(modalH1, modalCloseBtn);

    const modalTextAreaContainer = document.createElement('div');
    
    const modalForm = document.createElement('form');
    
    const modalTitleContainer = document.createElement('div');
    modalTitleContainer.classList.add('modal__title__container--editPosts');
    
    const modalLabelTitle = document.createElement('label');
    modalLabelTitle.setAttribute('for', 'title');
    modalLabelTitle.innerText = 'Título do post';
    
    const modalTextAreaTitle = document.createElement('textarea');
    modalTextAreaTitle.setAttribute('name', 'title');
    modalTextAreaTitle.setAttribute('cols', '90');
    modalTextAreaTitle.setAttribute('rows', '1');
    modalTextAreaTitle.innerHTML = postFound.title;
    
    modalTitleContainer.append(modalLabelTitle, modalTextAreaTitle);
    
    const modalTextContainer = document.createElement('div');
    modalTextContainer.classList.add('modal__text__container--editPosts');
    
    const modalLabelText = document.createElement('label');
    modalLabelText.setAttribute('for', 'text');
    modalLabelText.innerText = 'Conteúdo do post';
    
    const modalTextAreaText = document.createElement('textarea');
    modalTextAreaText.setAttribute('name', 'text');
    modalTextAreaText.setAttribute('rows', '10');
    modalTextAreaText.setAttribute('cols', '90');
    modalTextAreaText.setAttribute('wrap', 'soft');
    modalTextAreaText.innerHTML = postFound.content;
    
    modalTextContainer.append(modalLabelText, modalTextAreaText);

    const modalBtnContainer = document.createElement('div');
    modalBtnContainer.classList.add('modal__btn__container--editPosts');

    const modalCancelPost = document.createElement('button');
    modalCancelPost.classList.add('cancel__btn');
    modalCancelPost.innerText = 'Cancelar';

    const modalSavePost = document.createElement('button');
    modalSavePost.classList.add('save__btn');
    modalSavePost.innerText = 'Salvar alterações';
    modalSavePost.dataset.postId = postFound.id;
    modalBtnContainer.append(modalCancelPost, modalSavePost);
    
    modalForm.append(modalTitleContainer, modalTextContainer, modalBtnContainer);

    modalTextAreaContainer.appendChild(modalForm);

    modalContainer.append(modalProfileContainer, modalTextAreaContainer);

    return modalContainer;
}

export async function renderPerfilPhoto (){
    const photoContainer = document.querySelector('.newPost__container');
    const userData2 = JSON.parse(localStorage.getItem("@petInfo:data")) || "";
    const userName = document.querySelector('.name__container > p');
    userName.innerText = userData2.username;
    
    const photoPeril = await createPhoto(userData2);
   
    photoContainer.append(photoPeril);
}

export async function createPhoto (userData){
    const photoPeril = document.createElement('img');
    photoPeril.src = userData.avatar;
    photoPeril.alt = userData.username;
    
    return photoPeril;
}

//TIVE QUE FAZER ESSA FUNÇÃO AQUI PARA FUNCIONAR - CONVERSEI COM FERNANDO

export async function showLogout() {
    const button = document.querySelector(".newPost__container > img");
    const backgroud = document.querySelector(".logoff__container--after");
    const logoutOption = document.querySelector(".logoff__container");

    button.addEventListener("click", () => {
    backgroud.classList.toggle("hidden");
    logoutOption.classList.toggle("hidden");
    
    const buttonLogout = document.querySelector(".icon__container");
    
    buttonLogout.addEventListener("click", () => {
      localStorage.clear();
      window.location.replace("../../index.html");
    })
  })
}
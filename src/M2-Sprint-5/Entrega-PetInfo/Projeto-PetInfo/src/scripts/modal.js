import { createModalDelete, createModalEditPost, createModalNewPost, createModalOld, render } from "./render.js";
import { createPost, deletePost, updatePost } from "./requests.js";

export function handleModalOld (array){
    const modalOld = document.querySelector('.modal__controller');
    const modalOpenBtn = document.querySelectorAll('.text__container > button');
    modalOpenBtn.forEach(button =>{
        modalOld.close();
        button.addEventListener('click', ()=>{
            const modalContent = createModalOld(button.dataset.postId, array);

            modalOld.innerHTML = '';

            modalOld.appendChild(modalContent);

            modalOld.showModal();
            
            closeModalOld();
        })
    })
}

function closeModalOld (){
    const modalOldPost = document.querySelector('.modal__controller');
    const closeBtnOld = document.querySelector('.modal__btn__container--oldPosts > button');

    closeBtnOld.addEventListener('click', (e)=>{
        e.preventDefault();
        modalOldPost.close();
    });
}

export async function handleModalNewPost (){
    const modalNewPost = document.querySelector('.modal__controller');
    const modalOpenBtn = document.querySelector('.newPost__container > button');
    let count =0;
    modalOpenBtn.addEventListener('click', async ()=>{
        modalNewPost.close();
            const modalContent = await createModalNewPost();

            modalNewPost.innerHTML = '';

            modalNewPost.appendChild(modalContent);

            modalNewPost.showModal();
                        
            closeModalNew();

            const modalSendBtn = document.querySelector('.send__btn');
            modalSendBtn.addEventListener('click', async (e) =>{
                e.preventDefault();
                const modalTextAreaTitle = document.querySelector('.modal__title__container--newPosts > textarea');
                const modalTextAreaText = document.querySelector('.modal__text__container--newPosts > textarea');
                
                if(modalTextAreaTitle.value == '' || modalTextAreaText.value == ''){
                    count++;
                }
                
                const postBody = {
                    "title": modalTextAreaTitle.value,
                    "content": modalTextAreaText.value
                }
                
                if(count != 0){
                    count = 0;
                    // modalTextAreaTitle.value = ''; POR ESCOLHA MINHA, PREFERI NÃO APAGAR OS CAMPOS
                    // modalTextAreaText.value = '';
                    return alert('Por favor, preencha todos os campos');
                } else {
                    await createPost (postBody);
                    modalNewPost.close();
                    await render();
                }
            })
        })
}

function closeModalNew (){
    const modalNew = document.querySelector('.modal__controller');
    const closeBtnNew = document.querySelector('.modal__profile__container--newPosts > button');
    const cancelBtnNew = document.querySelector('.cancel__btn__newPost');

    closeBtnNew.addEventListener('click', (e)=>{
        e.preventDefault();
        modalNew.close();
    });

    cancelBtnNew.addEventListener('click', (e)=>{
        e.preventDefault();
        modalNew.close();
    });
}

export function handleModalDelete (array){
    const modalDelete = document.querySelector('.modal__controller');
    const modalOpenBtn = document.querySelectorAll('.delete__btn');
    modalOpenBtn.forEach(button =>{
        button.addEventListener('click', async (e)=>{
            modalDelete.close();    
            const modalContent = await createModalDelete(button.dataset.postId, array);
            modalDelete.innerHTML = '';
            
            modalDelete.appendChild(modalContent);
            
            modalDelete.showModal();
            
            closeModalDelete();    
            
            const modalDeleteBtn = document.querySelector('.confirm__btn');
            modalDeleteBtn.addEventListener('click', async (e) =>{
                e.preventDefault();
                await deletePost(modalDeleteBtn.dataset.postId);
                modalDelete.close();
                render();
                return;
            })
        })
    })

    return;
}

function closeModalDelete (){
    const modalDel = document.querySelector('.modal__controller');
    const closeBtnDelete = document.querySelector('.modal__profile__container--deletePosts > button');
    const cancelBtnDelete = document.querySelector('.cancel__btn__deletePosts');
    
    closeBtnDelete.addEventListener('click', (e)=>{
        e.preventDefault();
        modalDel.close();
    });

    cancelBtnDelete.addEventListener('click', (e)=>{
        e.preventDefault();
        modalDel.close();
    });
}

export function handleModalEdit (array){
    const modalEdit = document.querySelector('.modal__controller');
    const modalOpenBtn = document.querySelectorAll('.edit__btn');
    modalOpenBtn.forEach(button =>{
        button.addEventListener('click', async ()=>{
            modalEdit.close();
            const modalContent = await createModalEditPost(button.dataset.postId, array);

            modalEdit.innerHTML = '';

            modalEdit.appendChild(modalContent);

            modalEdit.showModal();
            
            closeModalEdit();

            const modalEditBtn = document.querySelector('.save__btn');
            modalEditBtn.addEventListener('click', async (e) =>{
                e.preventDefault();
                const modalTextAreaTitle = document.querySelector('.modal__title__container--editPosts > textarea');
                const modalTextAreaText = document.querySelector('.modal__text__container--editPosts > textarea');

                const postBody = {
                    "title": modalTextAreaTitle.value,
                    "content": modalTextAreaText.value
                  }
                  
                await updatePost (postBody, modalEditBtn.dataset.postId);
                modalEdit.close();
                render();
            })
        })
    })

}

function closeModalEdit (){
    const modaledited = document.querySelector('.modal__controller');
    const closeBtnEdit = document.querySelector('.modal__profile__container--editPosts > button');
    const cancelBtnEdit = document.querySelector('.cancel__btn');
    
    closeBtnEdit.addEventListener('click', (e)=>{
        e.preventDefault();
        modaledited.close();
    });

    cancelBtnEdit.addEventListener('click', (e)=>{
        e.preventDefault();
        modaledited.close();
    });
}
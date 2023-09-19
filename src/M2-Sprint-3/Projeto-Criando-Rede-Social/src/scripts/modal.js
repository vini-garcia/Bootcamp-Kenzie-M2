import { createModal } from './render.js'; 


export function renderModal (array){
    const modal = document.querySelector('.modal__controller');
    const modalOpenBtn = document.querySelectorAll('.oldPosts__button > button');

    modalOpenBtn.forEach(button =>{
        button.addEventListener('click', ()=>{

            const modalContent = createModal(button.dataset.postId, array);

            modal.innerHTML = '';

            modal.appendChild(modalContent);

            modal.showModal();
            
            closeModal();
        })
    })

}




function closeModal (){
    const modal = document.querySelector('.modal__controller');
    const closeBtn = document.querySelector('.modalProfile > span');

    closeBtn.addEventListener('click', (e)=>{
        modal.close();
    })
}
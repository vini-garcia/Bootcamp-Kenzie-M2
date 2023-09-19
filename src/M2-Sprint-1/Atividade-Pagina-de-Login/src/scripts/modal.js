/* Desenvolva seu código aqui... */

function handleModal(){
    const modal = document.getElementById('modal__controller');
    const openModal = document.getElementById('btn-cadastrar');

    openModal.addEventListener('click', ()=>{
        modal.showModal();

        closeModal();
    })

}

function closeModal(){
    const modal = document.getElementById('modal__controller');
    const close = document.getElementById('modal__close');

    close.addEventListener('click', ()=>{
        modal.close();
    })
}

handleModal();
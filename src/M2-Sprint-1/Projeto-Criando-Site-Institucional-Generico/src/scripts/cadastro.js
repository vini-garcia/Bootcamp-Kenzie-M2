function openModal() {
    const modal = document.getElementById('modal');
    const openModal = document.getElementById('btn_modal');
    const spanModal = document.getElementById('span_modal')
    
    openModal.addEventListener('click', ()=>{
        modal.showModal();

        closeModal();
    })

    spanModal.addEventListener('click', ()=>{
        modal.showModal();

        closeModal();
    })
}

openModal();

function closeModal(){
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close');

    closeModal.addEventListener('click', ()=>{
        modal.close();
    })
}
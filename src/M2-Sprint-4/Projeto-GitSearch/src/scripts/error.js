export function btnBack (){
    const errorBtn = document.querySelector('.error__container > button');

    errorBtn.addEventListener('click', () => {
        window.location.replace('../../index.html');
    })
}

btnBack();
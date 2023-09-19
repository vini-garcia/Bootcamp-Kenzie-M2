function showMenu (){
    const btnMenu = document.querySelector('.open');
    const navContainer = document.querySelector('.list__container');
    const divContainer = document.querySelector('.search__container');
    const profileContainer = document.querySelector('.profile__container');

    btnMenu.addEventListener('click', () => {
        navContainer.classList.toggle('show');
        divContainer.classList.toggle('show');
        profileContainer.classList.toggle('show');
    })
}

showMenu()
import { render } from "./render.js";

export function showProfile (){
    const profileData = JSON.parse(localStorage.getItem('searchProfileData'));
    const profileRepos = JSON.parse(localStorage.getItem('searchProfileRepos'));
    render(profileData, profileRepos);
}

export function changeUser (){
    const newUser = document.querySelector('.changeUser');

    newUser.addEventListener('click', () => {
        localStorage.clear();
        window.location.replace('../../index.html');
    })
}
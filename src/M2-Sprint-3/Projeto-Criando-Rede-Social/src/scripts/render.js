import { posts } from './database.js';
import { renderModal } from './modal.js';

// RENDERIZAR SUGESTÕES DE SEGUIDORES


export function followers (array){
    const profile_followers = document.querySelector('.profile_followers > ul');

    profile_followers.innerHTML = '';

    array.forEach(follower => {
        const profile = createProfile(follower);
        
    });

}

function createProfile(follower){
    const listProfile = document.createElement('li');

    const container__profile = document.createElement('div');

    const fig = document.createElement('fig');
    
    const imageProfile = document.createElement('img');
    imageProfile.src = follower.img;
    imageProfile.alt = 'Photo profile';

    fig.append(imageProfile);

    const titleProfile = document.createElement('h2');
    titleProfile.innerHTML = follower.user;

    const textProfile = document.createElement('p');
    textProfile.innerHTML = follower.stack;
  
    const buttonProfile = document.createElement('button');
    buttonProfile.innerText = 'Seguir';
    buttonProfile.dataset.followerId = follower.id;
    
    container__profile.append(fig, titleProfile, textProfile)
    listProfile.append(container__profile, buttonProfile);

    const profile_followers = document.querySelector('.profile_followers > ul');

    profile_followers.append(listProfile);
}

// RENDERIZAR POSTS ANTIGOS


export function renderPosts (array){
    const oldPosts = document.querySelector('.container__oldPosts > ul');

    oldPosts.innerHTML = '';

    array.forEach(post => {
        const profile = createPosts(post);
        
    })
    renderModal(posts);
}

function createPosts (post){
    const oldPostsListContainer = document.createElement('li');

    const oldPostsPerfil = document.createElement('div');
    oldPostsPerfil.classList.add('profile', 'oldPosts__profile');


    const perfilImage = document.createElement('img');
    perfilImage.src = post.img;
    perfilImage.alt = 'Photo profile';

    const perfilTitle = document.createElement('h2');
    perfilTitle.innerHTML = post.user;

    const perfilText = document.createElement('p');
    perfilText.innerHTML = post.stack;

    oldPostsPerfil.append(perfilImage, perfilTitle, perfilText);

    const oldPostsTitleContainer = document.createElement('div');
    oldPostsTitleContainer.classList.add('oldPosts__title');

    const oldPostsTitle = document.createElement('h2');
    oldPostsTitle.innerHTML = post.title;

    oldPostsTitleContainer.append(oldPostsTitle);

    const oldPostsTextContainer = document.createElement('div');
    oldPostsTextContainer.classList.add('oldPosts__text');

    const oldPostsText = document.createElement('p');
    oldPostsText.innerHTML = `${post.text.substring(0, 150)}...`;

    oldPostsTextContainer.append(oldPostsText);

    const oldPostsBtnContainer = document.createElement('div');
    oldPostsBtnContainer.classList.add('oldPosts__button');

    const oldPostsBtn = document.createElement('button');
    oldPostsBtn.innerText = 'Abrir post';
    oldPostsBtn.dataset.postId = post.id;

    const oldPostsImage = document.createElement('span');
    oldPostsImage.classList.add('material-symbols-rounded');
    oldPostsImage.innerHTML = 'favorite';
    oldPostsImage.dataset.heartId = post.id;

    const oldPostsContagem = document.createElement('p');
    oldPostsContagem.innerText = post.likes;

    oldPostsBtnContainer.append(oldPostsBtn, oldPostsImage, oldPostsContagem);    

    oldPostsListContainer.append(oldPostsPerfil, oldPostsTitleContainer, oldPostsTextContainer, oldPostsBtnContainer);

    const ulOldPosts = document.querySelector('.container__oldPosts > ul');

    ulOldPosts.append(oldPostsListContainer);

    oldPostsImage.addEventListener('click', e => {
        if (!e.target.classList.contains('heart__red')) {
          e.target.classList.add('heart__red');
          oldPostsContagem.innerText = post.likes + 1;
        } else {
          e.target.classList.remove('heart__red');
          oldPostsContagem.innerText = post.likes;
        }
      });


}


//MODAL


export function createModal (id, array){
    const modalContainer = document.createElement('div');
    const profileContainer = document.createElement('div');
    const profileImage = document.createElement('img');
    const profileTitle = document.createElement('h2');
    const profileText = document.createElement('p');
    const modalClose = document.createElement('span');
    const titleContainer = document.createElement('div');
    const modalTitle = document.createElement('h2');
    const textContainer = document.createElement('div');
    const modalText = document.createElement('p');

    const postFound = array.find(post => post.id === Number(id));

    modalContainer.classList.add('container__modal');

    profileContainer.classList.add('profile', 'modalProfile');

    profileImage.src = postFound.img;
    profileImage.alt = 'Photo profile';

    
    profileTitle.innerHTML = postFound.user;
    
    profileText.innerHTML = postFound.stack;
    
    modalClose.innerText = 'X';
    
    profileContainer.append(profileImage, profileTitle, profileText, modalClose);

    titleContainer.classList.add('modal__title');

    modalTitle.innerHTML = postFound.title;

    titleContainer.appendChild(modalTitle);

    textContainer.classList.add('modal__text');

    modalText.innerHTML = postFound.text;

    textContainer.appendChild(modalText);

    modalContainer.append(profileContainer, titleContainer, textContainer);

    return modalContainer;
}
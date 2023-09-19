import { users, posts } from './database.js';
import { renderPosts } from './render.js';

// NEW POST


export function newPost (){
    const title = document.querySelector('.newPosts__title > input');
    const text = document.querySelector('.newPosts__text > textarea');
    const btn = document.querySelector('.newPosts__button > button');

   
    
    btn.addEventListener('click', (e)=>{

        if(title.value == '' || text.value == ''){
            alert('Preenchimento de todos os campo obrigatório');
        }else{

        const newObj = {
            id: 0,
            title: '',
            text: '',
            user: users[0].user,
            stack: users[0].stack,
            img: users[0].img,
            likes: 0
        }
        
        newObj.id = posts.length;
        newObj.id++;
        newObj.title = title.value;
        newObj.text = text.value;

        posts.unshift(newObj);
        renderPosts(posts);
        e.preventDefault();
        title.value = '';
        text.value = '';

    }
    })
   
}
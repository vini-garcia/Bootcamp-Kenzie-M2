// BOTÃO SEGUIR

export function findfollower (array){
    const followertBtn = document.querySelectorAll('.profile_followers ul button');

    followertBtn.forEach(button =>{
       
        button.addEventListener('click', (e)=> {
            e.preventDefault()

            if(e.target.innerText == 'Seguir'){
                const heartId = addFollower(button.dataset.followerId, array, button);
            }
            else if(e.target.innerText == 'Seguindo'){
                const heartId = removeFollower(button.dataset.followerId, array, button);
            }
        })
    })
}

function addFollower(id, array, button){
    const followerFound = array.find(post => post.id === Number(id));
    
    if(button.dataset.followerId == followerFound.id){
        button.innerText = 'Seguindo';
        button.setAttribute('id', 'seguindo'); 
    }
}

function removeFollower (id, array, button){
    const followerFound = array.find(post => post.id === Number(id));
    
    if(button.dataset.followerId == followerFound.id){
        button.innerText = 'Seguir';
        button.removeAttribute('id', 'seguindo');

    }
}
export async function render (data, allRepos = []){
    const ulList = document.querySelector('#profile__section > ul');
    const headerProfile = document.querySelector('#profile__container');

    ulList.innerHTML = '';
    headerProfile.innerHTML = '';

    const profile = await createProfile(data);
    headerProfile.append(profile);
    
    allRepos.forEach(async (element) => {
        const card = await createCard(element);
        
        ulList.appendChild(card);
    })
}

function createCard (element){
    const cardContainer = document.createElement('li');

    const cardTitle = document.createElement('h3');
    cardTitle.innerText = element.name;

    const cardText = document.createElement('p');
    cardText.innerText = element.description;

    const cardBtn = document.createElement('button');

    const aBtn = document.createElement('a');
    aBtn.innerText = 'Repositório';
    aBtn.href = element.html_url;
    aBtn.setAttribute('target', '_blank');

    cardBtn.appendChild(aBtn);

    cardContainer.append(cardTitle, cardText, cardBtn);
    
    return cardContainer;
}

function createProfile (data){
    const profileContainer = document.createElement('div');
    
    const profileImage = document.createElement('img');
    profileImage.src = data.avatar_url;
    profileImage.alt = data.name;

    const profileName = document.createElement('h1');
    profileName.innerText = data.name;

    profileContainer.append(profileImage, profileName);

    return profileContainer;
}
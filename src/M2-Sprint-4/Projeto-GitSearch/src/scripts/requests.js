const url = 'https://api.github.com/users/';

export async function getGitHubProfileData (userName){
    const profileData = await fetch(`${url}${userName}`, {
        method: 'GET',
        headers: {
           'content-type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((resp) => {
        localStorage.setItem('searchProfileData', JSON.stringify(resp));

        if(resp.message !== 'Not Found'){
            window.location.replace('./src/pages/profile.html');
        }else{
            window.location.replace('./src/pages/error.html'); 
        }
    })
}

export async function getGitHubProfileRepos (userName){
    const profileRepos = await fetch(`${url}${userName}/repos`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json' 
        }
    })
    .then((response) => response.json())
    .then((resp) => {
        localStorage.setItem('searchProfileRepos', JSON.stringify(resp));
    })
    return profileRepos;
}
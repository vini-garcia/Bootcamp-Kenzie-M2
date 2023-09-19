import { getGitHubProfileData, getGitHubProfileRepos } from "./requests.js";

export async function searchProfile (){
    const input = document.querySelector('.search__container > input');
    const btn = document.querySelector('.search__container > button');

    btn.addEventListener('click', async (e) => {
        const profileRepos = await getGitHubProfileRepos(input.value);
        const profileData = await getGitHubProfileData(input.value);
    })
}
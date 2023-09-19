import { getAllPokemon, getPokemonByName } from "./requests.js";

export async function render (pokemons = [], pokemonName) {
    const mainList = document.querySelector('ul');

    mainList.innerHTML = '';

    if(pokemonName){
        const card = createCardByName(pokemonName);

        mainList.appendChild(card);
    }else{
  
    pokemons.forEach(pokemon => {
        const card = createCard(pokemon);
        
        mainList.appendChild(card)
    })
}
}


function createCard (pokemon) {
    const numberPokemon = pokemon.url.slice(34, -1)
    
    const pokemonContainer = document.createElement('li');
    
    const imageContainer = document.createElement('div');
    
    const pokemonImage = document.createElement('img');
    pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numberPokemon}.png`;
    pokemonImage.alt = pokemon.name;
    imageContainer.appendChild(pokemonImage);

    const pokemonText = document.createElement('p');
    pokemonText.innerText = pokemon.name;

    pokemonContainer.append(imageContainer, pokemonText);

    return pokemonContainer;
}



function createCardByName (pokemon) {
    const numberPokemon = pokemon.id
    
    const pokemonContainer = document.createElement('li');
    
    const imageContainer = document.createElement('div');
    
    const pokemonImage = document.createElement('img');
    pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numberPokemon}.png`;
    pokemonImage.alt = pokemon.name;
    imageContainer.appendChild(pokemonImage);

    const pokemonText = document.createElement('p');
    pokemonText.innerText = pokemon.name;

    pokemonContainer.append(imageContainer, pokemonText);

    return pokemonContainer;
}

export function searchPokemon (){
    const input = document.querySelector('input');
    const btn = document.querySelector('button');

    btn.addEventListener('click', (e) =>{
        e.preventDefault();
        if(input.value == ''){
            getAllPokemon();
        }else{
            getPokemonByName(input.value);
            input.value = '';
        }
    })
}

export function reload () {
    const img = document.querySelector('header > div > img');

    img.addEventListener('click', (e) => {
        getAllPokemon();
    })
}


export const toast = (message, color) => {
    const body = document.querySelector('body')
    const container = document.createElement('div')
    const text = document.createElement('p')
  
    container.classList.add('toast__container', 'toast__add')
    container.style.backgroundColor = color
  
    text.innerText = message
  
    container.appendChild(text)
  
    body.appendChild(container)
  
    setTimeout(() => {
      container.classList.add('toast__remove')
    }, 3000)
  
    setTimeout(() => {
      body.removeChild(container)
    }, 4990);
  }
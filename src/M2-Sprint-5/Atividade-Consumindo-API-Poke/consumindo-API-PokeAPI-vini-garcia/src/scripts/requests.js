import { render, toast } from "./render.js";

const red = '#C96047';
  
const baseURL = 'https://pokeapi.co/api/v2';

const requestHeaders = {
    "content-type": "application/json"
}

export async function getAllPokemon () {
    const allPokemon = await fetch(`${baseURL}/pokemon?limit=1130`,{
        method: "GET",
        headers: requestHeaders
    }).then((response) => response.json())
    render(allPokemon.results)
    return allPokemon;
}

export async function getPokemonByName (pokemonName) {
    const pokemon = await fetch(`${baseURL}/pokemon/${pokemonName.toLowerCase()}`,{
        method: "GET",
        headers: requestHeaders
    }).then((response) => {
        if(response.ok){
            response.json().then(responseJson => {
                render([], responseJson);
            })
        }else{
            toast('Nenhum Pokémon encontrado com esse nome', red);
        }
    })
    return pokemon;
}
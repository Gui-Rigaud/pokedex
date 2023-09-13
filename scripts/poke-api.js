
const pokeApi = {};

function convertPokeApiDetailsToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.number = pokeDetail.id;
    
    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.species = null;

    pokemon.height = pokeDetail.height;

    pokemon.weight = pokeDetail.weight;

    pokemon.abilities = pokeDetail.abilities;

    const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
    const [hp, attack, defense, specialAttack, specialDefense, speed] = stats;

    pokemon.hp = hp;

    pokemon.attack = attack;

    pokemon.defense = defense;

    pokemon.specialAttack = specialAttack;

    pokemon.specialDefense = specialDefense;

    pokemon.speed = speed;

    return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
            .then(convertPokeApiDetailsToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((detailPokemon) => Promise.all(detailPokemon))
        .then((pokemonDetails) => pokemonDetails)
        .catch((e) => console.log(e));
}

const getDetails = {};

function convertPokeApiDetailsToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.number = pokeDetail.id;
    
    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.speciesURL = pokeDetail.species.url;

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

    console.log(pokemon);

    return pokemon;
}

getDetails.getPokemons = (offset = 0, limit = 5) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${myParam}/`;

    return fetch(url)
        .then((response) => response.json())
            .then(convertPokeApiDetailsToPokemon)
        .catch((e) => console.log(e));
}

getDetails.getSpecies = (pokemon) => {
    return fetch(pokemon.speciesURL)
        .then((response) =>  response.json())
        .then((species) => species)
    .catch((e) => console.log(e));
}
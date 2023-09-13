const urlParams = new URLSearchParams(window.location.search);

const detalhes = document.getElementById("detailList");
const head = document.getElementById("headSlot");

const myParam = urlParams.get('pokeId');

function convertPokeHeadIntoDiv(pokemon) {
    return `
    <div class="${pokemon.type} pokemon">
        <h1 class="name">${pokemon.name}</h1>
        <span class="number">#${pokemon.number}</span>

        <div class="basic-info">
            <ul class="types">
                ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
            </ul>

            <img src="${pokemon.photo}"
                alt="${pokemon.name}" class="image">
        </div>
    </div>
    `
}

function convertPokeInfoIntoTable(pokemon) {
    return `
    <table class="about">
        <tbody>
            <tr>
                <td class="key">Species</td>
                <td class="value">${pokemon.species.map((specie) => specie).join(', ')}</td>
            </tr>
            <tr>
                <td class="key">Height</td>
                <td class="value" style="text-transform: none;">${Number(pokemon.height)/10} m</td>
            </tr>
            <tr>
                <td class="key">Weight</td>
                <td class="value">${Number(pokemon.weight)/10} kg</td>
            </tr>
            <tr>
                <td class="key">Abilities</td>
                <td class="value">${pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</td>
            </tr>
        </tbody>
    </table>

    <h1 style="margin-left: 1rem;">Base Stats</h1>

    <table class="base-stats">
        <tbody>
            <tr>
                <td class="key">HP</td>
                <td class="value">${pokemon.hp}</td>
            </tr>
            <tr>
                <td class="key">Attack</td>
                <td class="value">${pokemon.attack}</td>
            </tr>
            <tr>
                <td class="key">Defense</td>
                <td class="value">${pokemon.defense}</td>
            </tr>
            <tr>
                <td class="key">Sp. Atk</td>
                <td class="value">${pokemon.specialAttack}</td>
            </tr>
            <tr>
                <td class="key">Sp. Def</td>
                <td class="value">${pokemon.specialDefense}</td>
            </tr>
            <tr>
                <td class="key">Speed</td>
                <td class="value">${pokemon.speed}</td>
            </tr>
        </tbody>
    </table>
    `
}

function loadDetails() {

    getDetails.getPokemons().then((pokemon) => {
        getDetails.getSpecies(pokemon).then((species) => {
            pokemon.species = species.egg_groups.map((slot) => slot.name);

            const newHTML1 = convertPokeHeadIntoDiv(pokemon);
            const newHTML2 = convertPokeInfoIntoTable(pokemon);

            head.innerHTML += newHTML1;
            detalhes.innerHTML += newHTML2;
        })
    });
}

loadDetails();
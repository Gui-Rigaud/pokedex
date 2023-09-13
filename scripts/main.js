const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

function getId(event, number) {
    console.log(number);
}

const maxRecords = 151;
const limit = 5;
let offset = 0;

function loadPokemons(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {        
        const newHtml = pokemons.map((pokemon) => `
        <li id="${pokemon.number}" class="pokemon ${pokemon.type}" onclick="getId(event, '${pokemon.number}')">
            <a href="../pages/Detail/detalhes.html?pokeId=${pokemon.number}" class="detail-redirect">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ul class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ul>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </a>
        </li>`).join('')
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    let qtdRecords = offset + limit;

    if(qtdRecords >= maxRecords){
        let newLimit = maxRecords - offset;
        loadPokemons(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else{
        loadPokemons(offset, limit);
    }
})
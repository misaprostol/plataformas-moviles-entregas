// URL base de la API
const API_URL = 'https://pokeapi.co/api/v2/';

// Función para obtener los primeros 151 Pokémon
async function getPokemonList() {
    const response = await fetch(`${API_URL}pokemon?limit=151`);
    const data = await response.json();
    const pokemonList = data.results;

    // Llamar a la función para mostrar los Pokémon en el DOM
    displayPokemonList(pokemonList);
}

// Función para mostrar el listado de Pokémon
function displayPokemonList(pokemonList) {
    const pokemonListContainer = document.getElementById('pokemon-list');
    pokemonList.forEach((pokemon, index) => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('col-md-3', 'mb-4');
        pokemonCard.innerHTML = `
            <div class="card">
                <div class="card-body text-center">
                    <h5 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
                    <button class="btn btn-primary" onclick="getPokemonDetails('${pokemon.url}')">Ver Detalles</button>
                </div>
            </div>
        `;
        pokemonListContainer.appendChild(pokemonCard);
    });
}

// Función para obtener los detalles del Pokémon seleccionado
async function getPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();

    // Mostrar los detalles en el modal
    displayPokemonDetails(data);
}

// Función para mostrar los detalles del Pokémon en el modal
function displayPokemonDetails(pokemon) {
    document.getElementById('pokemonModalLabel').innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.getElementById('pokemon-image').src = pokemon.sprites.front_default;

    // Mostrar tipos
    const typesList = document.getElementById('pokemon-types');
    typesList.innerHTML = '';
    pokemon.types.forEach(type => {
        const listItem = document.createElement('li');
        listItem.innerText = type.type.name;
        typesList.appendChild(listItem);
    });

    // Mostrar habilidades
    const abilitiesList = document.getElementById('pokemon-abilities');
    abilitiesList.innerHTML = '';
    pokemon.abilities.forEach(ability => {
        const listItem = document.createElement('li');
        listItem.innerText = ability.ability.name;
        abilitiesList.appendChild(listItem);
    });

    // Mostrar movimientos (máximo 4)
    const movesList = document.getElementById('pokemon-moves');
    movesList.innerHTML = '';
    pokemon.moves.slice(0, 4).forEach(move => {
        const listItem = document.createElement('li');
        listItem.innerText = move.move.name;
        movesList.appendChild(listItem);
    });

    // Mostrar el modal
    $('#pokemonModal').modal('show');
}

// Inicializar la PokéDex cargando los Pokémon
getPokemonList();

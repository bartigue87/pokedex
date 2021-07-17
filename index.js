const pokeContainer = document.getElementById('poke-container');
const pokemonCount = 251;
const colors = {
  fire: '#F08030',
  grass: '#78C850',
  electric: '#F8D030',
  water: '#6890F0',
  ground: '#E0C068',
  rock: '#B8A038',
  fairy: '#F0B6BC',
  poison: '#A040A0',
  bug: '#A8B820',
  dragon: '#7038F8',
  psychic: '#F85888',
  flying: '#A890F0',
  fighting: '#C03028',
  normal: '#A8A878',
  dark: '#705848',
  steel: '#B8B8D0',
  ghost: '#705898',
  ice: '#98D8D8',
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, '0');

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) === 0);
  const type2 = main_types.find((type) => poke_types.indexOf(type) === 1);
  const color1 = colors[type];
  const color2 = colors[type2];
  console.log(color2);
  function displayType2(str, str2) {
    if (str === undefined) {
      return (str = null);
    } else return str;
  }

  if (color2 != undefined) {
    pokemonEl.style.backgroundImage = `linear-gradient(to bottom,${color1} , ${color2} )`;
  } else pokemonEl.style.backgroundColor = color1;

  console.log(pokemonEl.style.backgroundColor);

  const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${
          pokemon.id
        }.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type 1: <span>${type}</span> </small>
        <br>
        <small class="type" >Type 2: <span>${displayType2(
          type2,
          type
        )} </span> </small>
    </div>
    `;

  pokemonEl.innerHTML = pokemonInnerHTML;

  pokeContainer.appendChild(pokemonEl);
};

fetchPokemons();

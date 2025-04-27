import { useState } from 'react';
import './style.css';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemon, setPokemon] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!pokemonName) return;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.log('Erro ao buscar Pokémon:', error);
      setPokemon(null);
    }
  }

  return (
    <div className="container">
      <header>
        <strong>Pokedex</strong>
      </header>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Digite o nome do Pokémon"
          value={pokemonName}
          onChange={e => setPokemonName(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {pokemon ? (
        <div className="pokemon-info">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div>Name: {pokemon.name}</div>
          <div>Nº {pokemon.id}</div>
          <div>Peso: {pokemon.weight / 10}kg</div>
          <div>Altura: {pokemon.height / 10}m</div>
        </div>
      ) : (
        <p>Procure um Pokémon!</p>
      )}
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import ScoreBoard from './ScoreBoard';
import Card from './Card';

const App = () => {
  const [cards, setCards] = useState([]);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleShuffle = () => {
    setCards(shuffle([...cards]));
  };

  const getAllPokeman = async () => {
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon';
      const result = await fetch(`${url}?limit=12`);
      const data = await result.json();

      const createPokemanObject = async (results) => {
        const promises = results.map(async (pokemon) => {
          const pokemanObjectResult = await fetch(`${url}/${pokemon.name}`);
          const pokemanObject = await pokemanObjectResult.json();
          return pokemanObject;
        });

        const pokemanObjects = await Promise.all(promises);
        return pokemanObjects;
      };

      const pokemanObjects = await createPokemanObject(data.results);

      setCards(pokemanObjects);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };

  useEffect(() => {
    getAllPokeman();
  }, []);

  return (
    <div className="app">
      <ScoreBoard />
      <div className="cards-container">
        {cards.map((card, index) => (
          <Card
            imageUrl={card.sprites.front_default}
            name={card.name}
            handleShuffle={handleShuffle}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

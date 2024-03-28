import { useState, useEffect } from 'react';

const App = () => {
  const [cards, setCards] = useState([]);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleShuffle = () => {
    setCards(shuffle([...cards]));
  };

  const getAllPokeman = async () => {
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

    console.log(pokemanObjects);

    setCards(pokemanObjects);
  };

  useEffect(() => {
    getAllPokeman();
  }, []);

  return (
    <div className="app">
      {' '}
      {cards.map((card, index) => (
        <div className="card" key={index} onClick={handleShuffle}>
          <img src={card.sprites.front_default} alt={card.name} />
          <p>Name: {card.name}</p>
        </div>
      ))}
    </div>
  );
};

export default App;

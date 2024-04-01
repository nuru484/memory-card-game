const getAllPokeman = async (setCards) => {
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

export default getAllPokeman;

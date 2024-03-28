import { useState } from 'react';

const App = () => {
  const initialCards = [
    'Mariam',
    'Asana',
    'Afa',
    'Musah',
    'Latif',
    'Amba',
    'Moroo',
    'Lolo',
    'Kambang',
    'Fatima',
    'Abiba',
    'Memuna',
  ];

  const [cards, setCards] = useState(initialCards);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleShuffle = () => {
    setCards(shuffle([...cards]));
  };

  return (
    <div>
      {cards.map((card, index) => (
        <div className="card" key={index} onClick={handleShuffle}>
          {card}
          <p>Name</p>
        </div>
      ))}
    </div>
  );
};

export default App;

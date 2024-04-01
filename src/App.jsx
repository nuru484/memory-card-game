import { useState, useEffect } from 'react';
import ScoreBoard from './ScoreBoard';
import Card from './Card';
import getAllPokeman from './api-call';

const App = () => {
  const [cards, setCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleScores = (clickedCard) => {
    const isCardAlreadyClicked = clickedCards.some(
      (card) => card.id === clickedCard.id
    );

    if (!isCardAlreadyClicked) {
      setClickedCards([...clickedCards, clickedCard]);
      setCurrentScore(currentScore + 1);
    } else {
      currentScore > bestScore ? setBestScore(currentScore) : '';

      setCurrentScore(0);
      setClickedCards([]);
    }
  };

  useEffect(() => {
    getAllPokeman(setCards);
  }, []);

  return (
    <div className="app">
      <div className="header">
        <div className="description">
          <h1>Memory Card Game</h1>
          <p>
            Get points by clicking on an image but don't click on any more than
            once!
          </p>
        </div>

        <ScoreBoard currentScore={currentScore} bestScore={bestScore} />
      </div>

      <div className="cards-container">
        {cards.map((card, index) => (
          <Card
            imageUrl={card.sprites.front_default}
            name={card.name}
            handleShuffle={() => {
              setCards(shuffle([...cards]));
            }}
            handleScores={handleScores}
            card={card}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

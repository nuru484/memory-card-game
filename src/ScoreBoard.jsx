const ScoreBoard = ({ currentScore, bestScore }) => {
  return (
    <div className="scoreBoard">
      <p>Current Score: {currentScore}</p>
      <p>Best Score: {bestScore}</p>
    </div>
  );
};

export default ScoreBoard;

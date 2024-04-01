const Card = ({ imageUrl, name, handleShuffle, handleScores, card }) => {
  const onClick = () => {
    handleScores(card);
    handleShuffle();
  };

  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default Card;

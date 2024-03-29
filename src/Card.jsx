const Card = ({ imageUrl, name, handleShuffle }) => {
  return (
    <div className="card" onClick={handleShuffle}>
      <img src={imageUrl} alt={name} />
    </div>
  );
};

export default Card;

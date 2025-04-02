import "./card.scss";

export const Card = ({ image = "", title = "", author = "", onClick }) => {
  return (
    <div className="card-container" onClick={onClick}>
      <img className="image" src={image || ""} alt={title} />
      <div className="title" title={title}>
        {title}
      </div>
      <div className="author" title={author}>
        {author}
      </div>
    </div>
  );
};

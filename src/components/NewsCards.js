import "./NewsCards.css";

export const NewsCards = ({
  title,
  description,
  text,
  image,
  votes,
  className,
}) => {
  return (
    <li className={`news ${className ? className : ""}`}>
      <hr />
      <p className="author-news">Published by Gnomo 15 minutes ago</p>
      <p className="category-news">Category</p>
      {image ? (
        <img className="img-news" src="/favicon.ico" alt="news img" />
      ) : (
        ""
      )}
      <p className="title-news">{title}</p>
      <p className="desc-news">{className ? text : description}</p>
      <div className="actions-news">
        <button type="button">S</button>
        <button type="button">C</button>
        <button type="button">+1</button>
        <p>{votes}</p>
        <button type="button">-1</button>
      </div>
    </li>
  );
};

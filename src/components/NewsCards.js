import "./NewsCards.css";

export const NewsCards = () => {
  return (
    <li className="news">
      <hr />
      <p className="author-news">Published by Gnomo 15 minutes ago</p>
      <p className="category-news">Category</p>
      <img className="img-news" src="/favicon.ico" alt="news img" />
      <p className="title-news">lorem ipsum colepsum tumatsu postrum</p>
      <p className="desc-news">
        lorem ipsum colepsum tumatsu postrumlorem ipsum colepsum tumatsu postrum
        lorem ipsum colepsum tumatsu postrum lorem ipsum colepsum tumatsu
        postrum lorem ipsum colepsum tumatsu postrum lorem ipsum colepsum
        tumatsu postrum lorem ipsum colepsum tumatsu postrum
      </p>
      <div className="actions-news">
        <button type="button">S</button>
        <button type="button">C</button>
        <button type="button">+1</button>
        <button type="button">-1</button>
      </div>
    </li>
  );
};

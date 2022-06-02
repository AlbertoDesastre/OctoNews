import { useState } from "react";
import { capitalize } from "../utils/capitalizeString";
import { getStylesForCategory } from "../utils/getStylesForCategory";
import "./NewsCards.css";

export const NewsCards = ({
  username,
  date,
  title,
  description,
  text,
  image,
  votes,
  className,
  category,
}) => {
  const [color] = getStylesForCategory(category?.name);
  //test variable for like button when news not voted
  let [likeTest, setLikeTest] = useState(false);
  let [dislikeTest, setDisLikeTest] = useState(false);

  return (
    <article
      className={className ? className : undefined}
      style={{ borderTop: `10px solid ${color}` }}
    >
      <hr />
      <p className="author-news">
        Published by {username} {new Date(date).toLocaleString()} ago
      </p>
      <p className="category-news" style={{ border: `3px solid ${color}` }}>
        {capitalize(category?.name)}
      </p>
      {image ? (
        <img
          className="img-news"
          src={`${process.env.REACT_APP_BACKEND}/uploads/news/${image}`}
          alt="news img"
        />
      ) : (
        ""
      )}
      <p className="title-news">{title}</p>
      <p className="desc-news">{className ? text : description}</p>
      <div className="actions-news">
        <button className="share" type="button" />
        <button className="comments" type="button">
          154
        </button>
        <button
          className={likeTest ? "like" : "no-like"}
          type="button"
          onClick={(e) => {
            setLikeTest(!likeTest);
          }}
        />
        <p className="votes">{votes}</p>
        <button
          className={dislikeTest ? "dislike" : "no-dislike"}
          type="button"
          onClick={(e) => {
            setDisLikeTest(!dislikeTest);
          }}
        />
      </div>
    </article>
  );
};

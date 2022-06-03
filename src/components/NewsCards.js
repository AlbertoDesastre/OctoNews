import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "../utils/capitalizeString";
import { copyNewsLinkToClipBoard } from "../utils/copyNewsLinkToClipBoard";
import { getStylesForCategory } from "../utils/getStylesForCategory";
import "./NewsCards.css";

export const NewsCards = ({
  newsId,
  username,
  date,
  title,
  description,
  text,
  image,
  votes,
  comments,
  className,
  category,
}) => {
  const navigate = useNavigate();
  const [color] = getStylesForCategory(category?.name);
  //test variable for like button when news not voted
  let [likeTest, setLikeTest] = useState(false);
  let [dislikeTest, setDisLikeTest] = useState(false);
  const [isDropdownShare, setIsDropdownShare] = useState(false);

  const handleDropdown = (e) => {
    setIsDropdownShare(!isDropdownShare);
    copyNewsLinkToClipBoard(newsId);
  };

  useEffect(() => {
    let countdownToHide;
    if (isDropdownShare) {
      countdownToHide = setTimeout(() => {
        setIsDropdownShare(false);
      }, 1000);
    }

    return () => {
      clearTimeout(countdownToHide);
    };
  }, [isDropdownShare]);

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
          onClick={() => navigate(`/news/${newsId}`)}
        />
      ) : (
        ""
      )}
      <p className="title-news" onClick={() => navigate(`/news/${newsId}`)}>
        {title}
      </p>
      <p className="desc-news">{className ? text : description}</p>
      <div className="actions-news">
        <button className="share" type="button" onClick={handleDropdown} />
        <DropdownMenu isDropdown={isDropdownShare} />
        <button className="comments" type="button">
          {comments}
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

const DropdownMenu = ({ isDropdown }) => {
  return (
    <div
      className={
        isDropdown
          ? "dropdown-content-newscard dropdown-newscard"
          : "dropdown-newscard"
      }
    >
      <button>Link copied!</button>
    </div>
  );
};

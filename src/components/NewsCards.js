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
  const [color] = getStylesForCategory(category);
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

  console.log(category);

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
          /* src={`${process.env.REACT_APP_BACKEND}/uploads/news/${image}`} */
          src={`/octopus.png`}
          alt="news img"
          onClick={() => navigate(`/news/${newsId}`)}
        />
      ) : (
        ""
      )}
      <p
        className={className ? className : "title-news"}
        onClick={() => navigate(`/news/${newsId}`)}
        id={(className = "news-page" ? "news-page-title" : undefined)}
      >
        {title}
      </p>
      <p
        className="desc-news"
        id={(className = "news-page" ? "news-page-text" : undefined)}
      >
        {className ? text : description}
      </p>

      {/* Esto deberái renderizar el html solo si
       tiene la clase news-page. No funciona. Revisar */}
      {
        (className = "news-page" ? (
          <footer className="news-page news-page-footer">
            <ul className="news-page news-page-ul-for-buttons-edit-delete">
              <li className="news-page  news-page-button-li-of-footer">
                <button className="news-page delete-new-button">
                  Eliminar noticia
                </button>
              </li>
              <li className="news-page  news-page-button-li-of-footer">
                <button className="news-page edit-new-button">
                  Editar noticia
                </button>
              </li>
            </ul>
          </footer>
        ) : undefined)
      }

      <div
        className={className ? "news-page" : "action-news"}
        id={className ? "action-from-news" : undefined}
      >
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

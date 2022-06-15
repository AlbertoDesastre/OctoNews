import { useNavigate } from "react-router-dom";
import { capitalize } from "../../../utils/capitalizeString";

export const NewsBody = ({
  className,
  username,
  date,
  category,
  image,
  newsId,
  title,
  text,
  description,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <p className="author-news">
        Published by {username} {new Date(date).toLocaleString()} ago
      </p>
      {category && (
        <p
          className={className ? className + "-category" : "category-news"}
          style={{ border: `3px solid ${category.color}` }}
        >
          {capitalize(category.name)}
        </p>
      )}
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

      <p
        className={className ? className : "title-news"}
        onClick={() => navigate(`/news/${newsId}`)}
        id={className === "news-page" ? "news-page-title" : undefined}
      >
        {title}
      </p>
      <p
        className="desc-news"
        id={className === "news-page" ? "news-page-text" : undefined}
      >
        {className ? text : description}
      </p>
    </>
  );
};

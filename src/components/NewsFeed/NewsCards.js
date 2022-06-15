import { DeleteEditNewsButtons } from "./ComponentsUsedForNewsCard/DeleteEditNewsButtons";
import { FooterNewsCard } from "./ComponentsUsedForNewsCard/FooterNewsCard";
import { NewsBody } from "./ComponentsUsedForNewsCard/NewsBody";

import "./NewsCards.css";

export const NewsCards = ({
  newsId,
  username,
  usernameId,
  date,
  title,
  description,
  text,
  image,
  votes,
  comments,
  className,
  category,
  deleteSomeNewsAndRefreshIt,
}) => {
  return (
    <article
      className={className ? className : undefined}
      style={category && { borderTop: `10px solid ${category.color}` }}
    >
      <hr />
      <NewsBody
        className={className}
        username={username}
        date={date}
        category={category}
        image={image}
        newsId={newsId}
        title={title}
        text={text}
        description={description}
      />
      {className === "news-page" && (
        <DeleteEditNewsButtons
          newsId={newsId}
          deleteSomeNewsAndRefreshIt={deleteSomeNewsAndRefreshIt}
          usernameId={usernameId}
        />
      )}
      <FooterNewsCard
        className={className}
        votes={votes}
        comments={comments}
        newsId={newsId}
      />
    </article>
  );
};

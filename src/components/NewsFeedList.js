import { useGetFilters } from "../hooks/useGetFilters";
import { useGetNewsFiltered } from "../hooks/useGetNewsFiltered";
import { NewsCards } from "./NewsCards";
import "./NewsFeedList.css";

export const NewsFeedList = ({ categories }) => {
  const [filterAction, filterDate, sortFilter] = useGetFilters();

  const [newsList, , isLoading, error] = useGetNewsFiltered([
    filterAction,
    filterDate,
    sortFilter,
    categories,
  ]);

  return (
    <section className="feed">
      {isLoading ? (
        <img
          className="home-page loading feed"
          src="/three-dots.svg"
          alt="loading"
        />
      ) : error ? (
        <p className="home-page error">{error}</p>
      ) : newsList.length === 0 ? (
        <p className="home-page error"> Your query is incorrect </p>
      ) : (
        <ul>
          {newsList.map((news) => {
            return (
              <li key={news.id} className="news">
                <NewsCards
                  newsId={news.id}
                  username={news.user_name}
                  date={news.creation_date}
                  title={news.title}
                  image={news.image}
                  description={news.introduction_text}
                  text={news.news_text}
                  votes={news.votes}
                  comments={news.comments}
                  category={
                    categories &&
                    categories.find((e) => e.id === news.id_category)
                  }
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

import { useContext } from "react";
import { newsContext } from "../context/NewsContext";
import { useGetRemoteData } from "../hooks/useGetRemoteData";
import { get } from "../utils/api";
import { NewsCards } from "./NewsCards";
import "./NewsFeedList.css";

export const NewsFeedList = ({ categories }) => {
  const { newsList, isLoading, error } = useContext(newsContext);

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
      ) : (
        <ul>
          {newsList.map((news) => {
            return (
              <li key={news.id} className="news">
                <NewsCards
                  username={news.user_name}
                  date={news.creation_date}
                  title={news.title}
                  image={news.image}
                  description={news.introduction_text}
                  text={news.news_text}
                  votes={news.votos}
                  category={categories.find((e) => e.id === news.id_category)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

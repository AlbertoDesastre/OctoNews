import { useEffect, useState } from "react";
import { useLocationParams } from "../hooks/useLocationParams";
import { sortNewsWithParams } from "../utils/sortNewsWithParams";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { NewsCards } from "./NewsCards";
import "./NewsFeedList.css";

export const NewsFeedList = ({
  categories,
  category,
  newsList,
  isLoading,
  error,
}) => {
  const [currentLocation, sortParam, dateParam, queryParam] =
    useLocationParams();
  const [sortList, setSortList] = useState([]);

  useEffect(() => {
    sortNewsWithParams([
      newsList,
      setSortList,
      currentLocation,
      sortParam,
      dateParam,
    ]);
  }, [currentLocation, dateParam, sortParam, newsList, queryParam]);

  return (
    <section className="feed">
      {isLoading ? (
        <Loading className="home-page loading feed" />
      ) : error ? (
        <Error className="home-page error" error={error} />
      ) : sortList.length === 0 ? (
        <p className="home-page error"> There is no news. </p>
      ) : (
        <ul>
          {sortList.map((news) => {
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
                    categories
                      ? categories.find((e) => e.id === news.id_category)
                      : category
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

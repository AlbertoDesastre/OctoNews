import { useGetRemoteData } from "../hooks/useGetRemoteData";
import { get } from "../utils/api";
import { NewsCards } from "./NewsCards";
import "./NewsFeedList.css";

export const NewsFeedList = () => {
  const [newsList, setNewsList] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/news?date=2022-04-29`,
    get
  );

  return (
    <section className="feed">
      <ul>
        {newsList?.news ? (
          newsList.news.map((news) => {
            return (
              <li key={news.id} className="news">
                <NewsCards
                  title={news.title}
                  image={news.image}
                  description={news.introduction_text}
                  text={news.news_text}
                  votes={news.votos}
                />
              </li>
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </ul>
    </section>
  );
};

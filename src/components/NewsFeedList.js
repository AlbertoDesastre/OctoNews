import { useGetRemoteData } from "../hooks/useGetRemoteData";
import { get } from "../utils/api";
import { NewsCards } from "./NewsCards";
import "./NewsFeedList.css";

export const NewsFeedList = ({ categories }) => {
  const [newsList, setNewsList, isLoading, error] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/news`
  );

  return (
    <section className="feed">
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
    </section>
  );
};

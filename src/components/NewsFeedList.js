import { useEffect, useState } from "react";
import { useGetRemoteData } from "../hooks/useGetRemoteData";
import { get } from "../utils/api";
import { NewsCards } from "./NewsCards";
import "./NewsFeedList.css";

export const NewsFeedList = () => {
  const [newsList, setNewsList] = useGetRemoteData(
    "http://localhost:4000/news?date=2022-04-29",
    get
  );

  return (
    <section className="feed">
      <ul>
        {newsList.news.map((news) => {
          return (
            <NewsCards
              key={news.id}
              title={news.title}
              image={news.image}
              description={news.introduction_text}
              text={news.news_text}
              votes={news.votos}
            />
          );
        })}
      </ul>
    </section>
  );
};

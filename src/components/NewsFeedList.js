import { NewsCards } from "./NewsCards";
import "./NewsFeedList.css";

export const NewsFeedList = () => {
  return (
    <section className="feed">
      <ul>
        <NewsCards />
        <NewsCards />
      </ul>
    </section>
  );
};

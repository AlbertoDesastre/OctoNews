import { useParams } from "react-router-dom";
import { CategoryHeader } from "../components/NewsFeed/SingleCategory/CategoryHeader";
import { FilterAndPostNews } from "../components/NewsFeed/FilterAndPostNews";
import { Header } from "../components/Header";
import { NewsFeedList } from "../components/NewsFeed/NewsFeedList";
import { useGetRemoteData } from "../hooks/useGetRemoteData";

export const Category = () => {
  const { id } = useParams();

  const [currentCategory, , isLoading, error] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/categories/${id}`
  );
  const [newsList, , newsIsLoading, newsError] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/news?category=${currentCategory.name}`
  );

  return (
    <>
      <Header />
      <main>
        <CategoryHeader
          category={currentCategory}
          categoryIsLoading={isLoading}
          categoryError={error}
        />
        <FilterAndPostNews className="no-aside" />
        <NewsFeedList
          className="no-aside"
          category={currentCategory}
          newsList={newsList}
          isLoading={newsIsLoading}
          error={newsError}
        />
      </main>
    </>
  );
};

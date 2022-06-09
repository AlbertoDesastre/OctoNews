import { useParams } from "react-router-dom";
import { CategoryHeader } from "../components/CategoryHeader";
import { FilterAndPostNews } from "../components/FilterAndPostNews";
import { Header } from "../components/Header";
import { NewsFeedList } from "../components/NewsFeedList";
import { useGetRemoteData } from "../hooks/useGetRemoteData";

export const Category = () => {
  const { id } = useParams();

  const [currentCategory, , isLoading, error] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/categories/${id}`
  );
  const [newsList, , newsIsLoading, newsError] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/news`
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
        <FilterAndPostNews />
        <NewsFeedList
          category={currentCategory}
          newsList={newsList}
          isLoading={newsIsLoading}
          error={newsError}
        />
      </main>
    </>
  );
};

import { useSearchParams } from "react-router-dom";
import { FilterAndPostNews } from "../components/FilterAndPostNews";
import { Header } from "../components/Header";
import { NewsFeedList } from "../components/NewsFeedList";
import { useGetRemoteData } from "../hooks/useGetRemoteData";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ? searchParams.get("q") : "";
  const [categories] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/categories`
  );

  const [newsList, , newsIsLoading, newsError] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/news?q=${query}`
  );

  return (
    <>
      <Header />
      <main>
        <FilterAndPostNews className="search-page" />
        <NewsFeedList
          categories={categories}
          newsList={newsList}
          isLoading={newsIsLoading}
          error={newsError}
        />
      </main>
    </>
  );
};

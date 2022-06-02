import { FilterAndPostNews } from "../components/FilterAndPostNews";
import { Header } from "../components/Header";
import { NewsFeedList } from "../components/NewsFeedList";
import { useGetRemoteData } from "../hooks/useGetRemoteData";

export const Search = () => {
  const [categories] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/categories`
  );

  return (
    <>
      <Header />
      <main>
        <FilterAndPostNews className="search-page" />
        <NewsFeedList categories={categories} />
      </main>
    </>
  );
};

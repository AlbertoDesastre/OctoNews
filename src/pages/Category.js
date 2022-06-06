import { CategoryHeader } from "../components/CategoryHeader";
import { FilterAndPostNews } from "../components/FilterAndPostNews";
import { Header } from "../components/Header";
import { NewsFeedList } from "../components/NewsFeedList";
import { useGetRemoteData } from "../hooks/useGetRemoteData";

export const Category = () => {
  const [categories, , isLoading, error] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/categories`
  );
  return (
    <>
      <Header />
      <main>
        <CategoryHeader />
        <FilterAndPostNews />
        <NewsFeedList categories={categories} />
      </main>
    </>
  );
};

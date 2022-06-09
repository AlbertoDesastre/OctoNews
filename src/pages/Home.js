import { CarouselList } from "../components/Carousel";
import { FilterAndPostNews } from "../components/FilterAndPostNews";
import { Header } from "../components/Header";
import { NewsFeedList } from "../components/NewsFeedList";
import { useGetRemoteData } from "../hooks/useGetRemoteData";

export const Home = () => {
  const [categories, , isLoading, error] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/categories`
  );
  const [newsList, , newsIsLoading, newsError] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/news`
  );

  return (
    <>
      <Header />
      <main>
        <CarouselList
          categories={categories}
          categoryIsLoading={isLoading}
          categoryError={error}
        />
        <FilterAndPostNews />
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

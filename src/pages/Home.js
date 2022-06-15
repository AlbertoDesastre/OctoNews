import { CarouselList } from "../components/NewsFeed/Carousel";
import { FilterAndPostNews } from "../components/NewsFeed/FilterAndPostNews";
import { Header } from "../components/Header";
import { NewsFeedList } from "../components/NewsFeed/NewsFeedList";
import { useGetRemoteData } from "../hooks/useGetRemoteData";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

export const Home = () => {
  const { height, width } = useWindowDimensions();
  const [categories, , isLoading, error] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/categories`
  );
  const [newsList, , newsIsLoading, newsError] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/news`
  );
  let classNameForCategory = "cards-container";

  if (width < 1000) classNameForCategory = "carousel";

  return (
    <>
      <Header />
      <main>
        <CarouselList
          className={classNameForCategory}
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

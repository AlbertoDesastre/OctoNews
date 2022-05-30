import { CarouselList } from "../components/Carousel";
import { FilterAndPostNews } from "../components/FilterAndPostNews";
import { Header } from "../components/Header";
import { NewsFeedList } from "../components/NewsFeedList";
import { useGetRemoteData } from "../hooks/useGetRemoteData";
import { get } from "../utils/api";

export const Home = () => {
  const [categories] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/categories`,
    get
  );

  return (
    <>
      <Header />
      <main>
        <CarouselList categories={categories} />
        <FilterAndPostNews />
        <NewsFeedList categories={categories} />
      </main>
    </>
  );
};

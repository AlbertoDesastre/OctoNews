import { CarouselList } from "../components/Carousel";
import { FilterAndPostNews } from "../components/FilterAndPostNews";
import { Header } from "../components/Header";
import { NewsFeedList } from "../components/NewsFeedList";

export const Home = () => {
  return (
    <>
      <Header />
      <main>
        <CarouselList />
        <FilterAndPostNews />
        <NewsFeedList />
      </main>
    </>
  );
};

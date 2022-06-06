import { FilterAndPostNews } from "../components/FilterAndPostNews";
import { Header } from "../components/Header";
import { NewsFeedList } from "../components/NewsFeedList";
import { useGetRemoteData } from "../hooks/useGetRemoteData";
import "./category.css";

export const Category = () => {
  const [categories, , isLoading, error] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/categories`
  );
  return (
    <>
      <Header />
      <main>
        <section className="category-page-header">
          <header className="category-page-header">
            <img src="/categoryIcons/2134234234252.jpg" alt="" />
          </header>
          <article className="category-page">
            <img src="/categoryIcons/2134234234252.jpg" alt="" />
            <h2>Category</h2>
            <p>
              Todas las noticias que puedes esperar con un toque 'pintoresco'
            </p>
          </article>
        </section>
        <FilterAndPostNews />
        <NewsFeedList categories={categories} />
      </main>
    </>
  );
};

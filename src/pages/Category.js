import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryHeader } from "../components/CategoryHeader";
import { FilterAndPostNews } from "../components/FilterAndPostNews";
import { Header } from "../components/Header";
import { NewsFeedList } from "../components/NewsFeedList";
import { useGetCategoryNamePage } from "../hooks/useGetCategoryNamePage";
import { useGetRemoteData } from "../hooks/useGetRemoteData";

export const Category = () => {
  const { categoryName: categoryPageName } = useParams();

  const [categories, setCategories] = useGetRemoteData(
    `${process.env.REACT_APP_BACKEND}/categories`
  );

  const [currentCategory] = useGetCategoryNamePage(
    categories,
    categoryPageName
  );

  const currentCategoryName = currentCategory[0] && currentCategory[0].name;

  return (
    <>
      <Header />
      <main>
        <CategoryHeader categoryName={currentCategoryName} />
        <FilterAndPostNews />
        <NewsFeedList categories={currentCategory} />
      </main>
    </>
  );
};

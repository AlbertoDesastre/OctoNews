import { useEffect, useState } from "react";

export const useGetCategoryNamePage = (categories, categoryPageName) => {
  const [currentCategory, setCurrentCategory] = useState([]);
  useEffect(() => {
    setCurrentCategory(categories.filter((e) => e.name === categoryPageName));
  }, [categories, categoryPageName]);
  return [currentCategory, setCurrentCategory];
};

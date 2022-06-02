import { format, sub } from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { get, getOrderByAsc } from "../utils/api";

export const useGetNewsFiltered = (filterNews, filterDate) => {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getNewsData = async (url) => {
      try {
        setIsLoading(true);
        setError(null);
        if (filterNews === "top") {
          await getOrderByAsc(url, setNewsList);
        } else {
          await get(url, setNewsList);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    switch (filterNews) {
      case "new":
        console.log("¿hola?");
        getNewsData(`${process.env.REACT_APP_BACKEND}/news`);
        break;
      case "top":
        const currentDate = new Date();
        if (filterDate === "today") {
          const todayDateFormatted = format(currentDate, "yyyy-MM-dd");
          getNewsData(
            `${process.env.REACT_APP_BACKEND}/news?date=${todayDateFormatted}`
          );
        } else if (filterDate === "yesterday") {
          const yesterdayDate = sub(currentDate, { days: 1 });
          const yesterdayDateFormatted = format(yesterdayDate, "yyyy-MM-dd");
          getNewsData(
            `${process.env.REACT_APP_BACKEND}/news?date=${yesterdayDateFormatted}`
          );
        }
        break;
      case "search":
        console.log("probando");
        const text = searchParams.get("q");
        getNewsData(`${process.env.REACT_APP_BACKEND}/news?q=${text}`);
        break;
      default:
        getNewsData(`${process.env.REACT_APP_BACKEND}/news`);
        break;
    }
  }, [filterNews, filterDate, searchParams]);

  return [newsList, setNewsList, isLoading, error];
};

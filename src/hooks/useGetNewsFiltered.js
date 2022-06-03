import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { get, getOrderByAsc } from "../utils/api";
import { getCurrentAndPreviousDay } from "../utils/getCurrentAndPreviousDate";

export const useGetNewsFiltered = (filterNews, filterDate, sortFilter) => {
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
        getNewsData(`${process.env.REACT_APP_BACKEND}/news`);
        break;
      case "top":
        const [currentDate, yesterdayDate] = getCurrentAndPreviousDay(1);
        if (filterDate === "today") {
          getNewsData(
            `${process.env.REACT_APP_BACKEND}/news?date=${currentDate}`
          );
        } else if (filterDate === "yesterday") {
          getNewsData(
            `${process.env.REACT_APP_BACKEND}/news?date=${yesterdayDate}`
          );
        }
        break;
      case "search":
        const text = searchParams.get("q");
        if (sortFilter === "top") {
          const [currentDate, yesterdayDate] = getCurrentAndPreviousDay(1);
          if (filterDate === "today") {
            getNewsData(
              `${process.env.REACT_APP_BACKEND}/news?q=${text}&date=${currentDate}`
            );
          } else if (filterDate === "yesterday") {
            getNewsData(
              `${process.env.REACT_APP_BACKEND}/news?q=${text}&date=${yesterdayDate}`
            );
          }
        } else {
          getNewsData(`${process.env.REACT_APP_BACKEND}/news?q=${text}`);
        }
        break;
      default:
        getNewsData(`${process.env.REACT_APP_BACKEND}/news`);
        break;
    }
  }, [filterNews, filterDate, searchParams, sortFilter]);

  return [newsList, setNewsList, isLoading, error];
};

import { format, sub } from "date-fns";
import { useEffect, useState } from "react";
import { get, getOrderBy } from "../utils/api";

export const useGetNewsFiltered = (filterNews, filterDate) => {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const getNewsData = async (url) => {
      try {
        setIsLoading(true);
        setError(null);
        if (filterNews === "new") {
          await get(url, setNewsList);
        } else {
          await getOrderBy(url, setNewsList);
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
      default:
        getNewsData(`${process.env.REACT_APP_BACKEND}/news`);
        break;
    }
  }, [filterNews, filterDate]);

  return [newsList, setNewsList, isLoading, error];
};

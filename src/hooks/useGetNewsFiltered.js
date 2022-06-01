import { format, sub } from "date-fns";
import { useEffect, useState } from "react";
import { get } from "../utils/api";

export const useGetNewsFiltered = (filterNews, filterDate) => {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const getRemoteData = async (url) => {
      try {
        setIsLoading(true);
        setError(null);
        await get(url, setNewsList);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    switch (filterNews) {
      case "new":
        getRemoteData(`${process.env.REACT_APP_BACKEND}/news`);
        break;
      case "top":
        const currentDate = new Date();
        if (filterDate === "today") {
          const todayDateFormatted = format(currentDate, "yyyy-MM-dd");
          getRemoteData(
            `${process.env.REACT_APP_BACKEND}/news?date=${todayDateFormatted}`
          );
        } else if (filterDate === "yesterday") {
          const yesterdayDate = sub(currentDate, { days: 1 });
          const yesterdayDateFormatted = format(yesterdayDate, "yyyy-MM-dd");
          getRemoteData(
            `${process.env.REACT_APP_BACKEND}/news?date=${yesterdayDateFormatted}`
          );
        }
        break;
      default:
        getRemoteData(`${process.env.REACT_APP_BACKEND}/news`);
        break;
    }
  }, [filterNews, filterDate]);

  return [newsList, setNewsList, isLoading, error];
};

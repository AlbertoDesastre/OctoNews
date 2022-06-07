import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { get, getOrderByAsc } from "../utils/api";
import { getCurrentAndPreviousDay } from "../utils/getCurrentAndPreviousDate";

//This functions will manage the feed of news. Here will be all the fetchs needed based on filter we give him.
//filterAction -> From where the action is executed (/, /new,/top,/search,/category)
//filterDate -> date of the news (today or yesterday)
//sortFilter -> how we will sort the news (new or top voted)
export const useGetNewsFiltered = ([
  filterAction,
  filterDate,
  sortFilter,
  currentCategoryPage,
]) => {
  //We make a state where we store the news, if it's still loading, if there is an error and get the params from the URL.
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    //First we declare a new async function so we can await fetchs and do some extra conditionals
    const getNewsData = async (url) => {
      try {
        setIsLoading(true);
        setError(undefined);
        //We check if the action is top. If it is we use the named fuction which will do a fetch and order
        //the news based on most voted.
        if (filterAction === "top") {
          await getOrderByAsc(url, setNewsList);
        } else {
          //If not, will do a normal fetch
          await get(url, setNewsList);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    //We do a switch conditional to check which filterAction we are.
    switch (filterAction) {
      case "new":
        //If we are in new we do a normal fetch with all news.
        getNewsData(`${process.env.REACT_APP_BACKEND}/news`);
        break;
      case "top":
        //If we are in top (most voted) we need a date to check and whether it be "today" or "yesterday"
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
        //If we are in search. First we take the query text from searchParams (to clarify, the params from the URL)
        //in this case de queryparam is "q" for example. "/search?q=somethingtowrite"
        const text = searchParams.get("q");
        //Here we check the sortFilter, if it's top, we check the most voted whether it is today or yesterday.
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
          //if sortFilter is not "top" then it will be "new" so we just get all news based on the query text for all dates.
          getNewsData(`${process.env.REACT_APP_BACKEND}/news?q=${text}`);
        }
        break;

      case "category":
        //If we are in category. First we take current category name
        const currentCategoryName = currentCategoryPage.name;
        //We check sortFilter if it's Top and then check the dateFilter.
        if (sortFilter === "top") {
          const [currentDate, yesterdayDate] = getCurrentAndPreviousDay(1);
          if (filterDate === "today") {
            //Here we do some short-circuit conditionals to prevent errors from the fetch.
            //This statement is like if currentCategory is not undefined it will do the fetch.
            currentCategoryName &&
              getNewsData(
                `${process.env.REACT_APP_BACKEND}/news?category=${currentCategoryName}&date=${currentDate}`
              );
          } else if (filterDate === "yesterday") {
            currentCategoryName &&
              getNewsData(
                `${process.env.REACT_APP_BACKEND}/news?category=${currentCategoryName}&date=${yesterdayDate}`
              );
          }
        } else {
          //If there is not "top" it will be "new" and we get all news from that category
          currentCategoryName &&
            getNewsData(
              `${process.env.REACT_APP_BACKEND}/news?category=${currentCategoryName}`
            );
        }
        break;
      default:
        //If there is a case where is not controlled, it will just get all news
        getNewsData(`${process.env.REACT_APP_BACKEND}/news`);
        break;
    }
    //If any of these variables change, useEffect will happen again.
  }, [filterAction, filterDate, searchParams, sortFilter, currentCategoryPage]);

  return [newsList, setNewsList, isLoading, error];
};

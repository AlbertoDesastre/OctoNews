import { getSelectedDateFromParams } from "./getSelectedDateFromParams";

export const sortNewsWithParams = ([
  newsList,
  setSortList,
  currentLocation,
  sortParam,
  dateParam,
]) => {
  //Here we will check all params we have currently on our location and sort based on that.
  if (currentLocation === "top") {
    //If location is "/top" we get the dateParam and sort based on most voted and filter by date
    const dateToCompare = getSelectedDateFromParams(dateParam);
    const sortedList = [
      ...newsList
        .sort((a, b) => b.votes - a.votes)
        .filter(
          (news) =>
            new Date(news.creation_date).getTime() > dateToCompare.getTime()
        ),
    ];
    setSortList(sortedList);
  } else if (currentLocation === "search" || currentLocation === "category") {
    //if location is whether search or category we need to check the sortParam
    if (sortParam === "top") {
      //if it's top we get the dateParam and sort based on most voted and filter by date
      const dateToCompare = getSelectedDateFromParams(dateParam);
      const sortedList = [
        ...newsList
          .sort((a, b) => b.votes - a.votes)
          .filter(
            (news) =>
              new Date(news.creation_date).getTime() > dateToCompare.getTime()
          ),
      ];
      setSortList(sortedList);
    } else {
      //if not we search and sort news by time.
      const sortedList = [
        ...newsList.sort(
          (a, b) =>
            new Date(b.creation_date).getTime() -
            new Date(a.creation_date).getTime()
        ),
      ];
      setSortList(sortedList);
    }
  } else {
    //if not we search and sort news by time.
    const sortedList = [
      ...newsList.sort(
        (a, b) =>
          new Date(b.creation_date).getTime() -
          new Date(a.creation_date).getTime()
      ),
    ];
    setSortList(sortedList);
  }
};

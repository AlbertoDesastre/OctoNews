import { sub } from "date-fns";

//this function will return a date based on a fixed string we give to the function.
//this function will be used to sort news comparing this date with the actual date of the news.
export const getSelectedDateFromParams = (date) => {
  const currentDate = new Date();
  let selectedDate;

  switch (date) {
    case "all":
      //all return a date from 50 years ago to show all news.
      selectedDate = sub(currentDate, { years: 50 });
      break;
    case "today":
      //today return today's date
      selectedDate = currentDate;
      break;
    case "week":
      //week return the date from a week ago
      selectedDate = sub(currentDate, { days: 7 });
      break;
    case "month":
      //month return the date from a month ago
      selectedDate = sub(currentDate, { months: 1 });
      break;
    case "year":
      //year return the date from a year ago
      selectedDate = sub(currentDate, { years: 1 });
      break;
    default:
      selectedDate = sub(currentDate, { years: 50 });
      break;
  }

  return selectedDate;
};

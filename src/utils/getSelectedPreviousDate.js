import { format, sub } from "date-fns";

export const getSelectedPreviousDate = (date) => {
  const currentDate = new Date();
  const todayDateFormatted = format(currentDate, "yyyy-MM-dd");
  let selectedDate;
  let selectedDateFormatted;

  if (date === "yesterday") {
    selectedDate = sub(currentDate, { days: 1 });
    selectedDateFormatted = format(selectedDate, "yyyy-MM-dd");
  } else if (date === "today") {
    selectedDateFormatted = todayDateFormatted;
  } else {
    selectedDate = sub(currentDate, { days: date });
    selectedDateFormatted = format(selectedDate, "yyyy-MM-dd");
  }

  return selectedDateFormatted;
};

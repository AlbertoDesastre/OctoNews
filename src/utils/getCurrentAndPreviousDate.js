import { format, sub } from "date-fns";

export const getCurrentAndPreviousDay = (daysBeforeToday = 1) => {
  const currentDate = new Date();
  const todayDateFormatted = format(currentDate, "yyyy-MM-dd");
  const previousDate = sub(currentDate, { days: daysBeforeToday });
  const previousDateFormatted = format(previousDate, "yyyy-MM-dd");

  return [todayDateFormatted, previousDateFormatted];
};

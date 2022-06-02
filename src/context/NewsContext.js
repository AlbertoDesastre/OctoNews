import { createContext, useState } from "react";
import { useGetNewsFiltered } from "../hooks/useGetNewsFiltered";

export const newsContext = createContext();

export const NewsContextProvider = ({ children }) => {
  const [selectedFilterNews, setSelectedFilterNews] = useState("new");
  const [selectedFilterDate, setSelectedFilterDate] = useState("today");

  const [newsList, setNewsList, isLoading, error] = useGetNewsFiltered(
    selectedFilterNews,
    selectedFilterDate
  );

  return (
    <newsContext.Provider
      value={{
        selectedFilterNews,
        selectedFilterDate,
        setSelectedFilterNews,
        setSelectedFilterDate,
        newsList,
        setNewsList,
        isLoading,
        error,
      }}
    >
      {children}
    </newsContext.Provider>
  );
};

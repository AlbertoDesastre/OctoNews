import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetFilters } from "../hooks/useGetFilters";
import "./FilterAndPostNews.css";

export const FilterAndPostNews = () => {
  const [filterNewsBy, dateFilter] = useGetFilters();

  const [selectedFilterNews, setSelectedFilterNews] = useState(filterNewsBy);
  const [selectedFilterDate, setSelectedFilterDate] = useState(dateFilter);
  const [, setSearchParams] = useSearchParams();
  const navigateFilter = useNavigate();

  useEffect(() => {
    setSelectedFilterNews(filterNewsBy);
  }, [filterNewsBy]);

  useEffect(() => {
    setSelectedFilterDate(dateFilter);
  }, [dateFilter]);

  return (
    <section className="filterAndPost">
      <select
        className={`filter ${selectedFilterNews}`}
        name="filter"
        id="filter"
        value={selectedFilterNews}
        onChange={(e) => {
          setSelectedFilterNews(e.target.value);
          navigateFilter(e.target.value);
        }}
      >
        <option value="new">New</option>
        <option value="top">Top</option>
      </select>
      {selectedFilterNews === "top" ? (
        <select
          className="filter-date"
          name="filter-date"
          id="filter-date"
          value={selectedFilterDate}
          onChange={(e) => {
            setSelectedFilterDate(e.target.value);
            setSearchParams({ t: e.target.value });
          }}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
        </select>
      ) : (
        ""
      )}
      <svg id="verticalLine">
        <line x1="6" y1="0" x2="6" y2="40"></line>
      </svg>
      <button className="post-button" type="button" />
    </section>
  );
};

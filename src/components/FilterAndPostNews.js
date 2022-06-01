import { useContext, useState } from "react";
import { newsContext } from "../context/NewsContext";
import "./FilterAndPostNews.css";
const { sub } = require("date-fns");

export const FilterAndPostNews = () => {
  const {
    selectedFilterNews,
    selectedFilterDate,
    setSelectedFilterNews,
    setSelectedFilterDate,
  } = useContext(newsContext);
  return (
    <section className="filterAndPost">
      <select
        className={`filter ${selectedFilterNews}`}
        name="filter"
        id="filter"
        value={selectedFilterNews}
        onChange={(e) => setSelectedFilterNews(e.target.value)}
      >
        <option value="new">New</option>
        <option value="top">Top</option>
      </select>
      {selectedFilterNews === "new" ? (
        ""
      ) : (
        <select
          className="filter-date"
          name="filter-date"
          id="filter-date"
          value={selectedFilterDate}
          onChange={(e) => setSelectedFilterDate(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
        </select>
      )}
      <svg id="verticalLine">
        <line x1="6" y1="0" x2="6" y2="40"></line>
      </svg>
      <button className="post-button" type="button" />
    </section>
  );
};

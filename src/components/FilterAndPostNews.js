import { useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useGetFilters } from "../hooks/useGetFilters";
import { searchParamsToObject } from "../utils/searchParamsToObject";
import "./FilterAndPostNews.css";

export const FilterAndPostNews = ({ className }) => {
  const [, dateFilter, sortFilter] = useGetFilters();
  const [selectedFilterNews, setSelectedFilterNews] = useState(sortFilter);
  console.log(sortFilter);
  const [selectedFilterDate, setSelectedFilterDate] = useState(dateFilter);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigateFilter = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setSelectedFilterNews(sortFilter);
  }, [sortFilter]);

  useEffect(() => {
    setSelectedFilterDate(dateFilter);
  }, [dateFilter]);

  const handleFilterNewsOnChange = (e) => {
    if (pathname !== "/search") {
      navigateFilter(`/${e.target.value}`);
    } else {
      setSelectedFilterNews(e.target.value);
      let params = searchParamsToObject(searchParams);
      params.sort = e.target.value;
      setSearchParams(createSearchParams(params));
    }
  };

  const handleFilterDateOnChange = (e) => {
    setSelectedFilterDate(e.target.value);
    if (pathname !== "/search") {
      setSelectedFilterDate(e.target.value);
      setSearchParams({ t: e.target.value });
    } else {
      let params = searchParamsToObject(searchParams);
      params.t = e.target.value;
      setSearchParams(createSearchParams(params));
    }
  };

  return (
    <section className={`filterAndPost ${className ? className : ""}`}>
      <select
        className={`filter ${selectedFilterNews}`}
        name="filter"
        id="filter"
        value={selectedFilterNews}
        onChange={handleFilterNewsOnChange}
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
          onChange={handleFilterDateOnChange}
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

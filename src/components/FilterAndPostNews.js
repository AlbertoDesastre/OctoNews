import { useContext, useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useGetFilters } from "../hooks/useGetFilters";
import { searchParamsToObject } from "../utils/searchParamsToObject";
import "./FilterAndPostNews.css";

export const FilterAndPostNews = ({ className }) => {
  const { token } = useContext(AuthContext);
  const [, dateFilter, sortFilter] = useGetFilters();
  const [selectedFilterNews, setSelectedFilterNews] = useState(sortFilter);
  const [selectedFilterDate, setSelectedFilterDate] = useState(dateFilter);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setSelectedFilterNews(sortFilter);
  }, [sortFilter]);

  useEffect(() => {
    setSelectedFilterDate(dateFilter);
  }, [dateFilter]);

  const handleFilterNewsOnChange = (e) => {
    if (pathname === "/search") {
      setSelectedFilterNews(e.target.value);
      let { q } = searchParamsToObject(searchParams);

      const params = {
        q,
        sort: e.target.value,
      };
      setSearchParams(createSearchParams(params));
    } else if (pathname.includes("category")) {
      setSelectedFilterNews(e.target.value);
      const params = {
        sort: e.target.value,
      };
      setSearchParams(createSearchParams(params));
    } else {
      navigate(`/${e.target.value}`);
    }
  };

  const handleFilterDateOnChange = (e) => {
    setSelectedFilterDate(e.target.value);
    if (pathname === "/search" || pathname.includes("category")) {
      let params = searchParamsToObject(searchParams);
      params.t = e.target.value;
      setSearchParams(createSearchParams(params));
    } else {
      setSelectedFilterDate(e.target.value);
      setSearchParams({ t: e.target.value });
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
      {className === "search-page" ? (
        ""
      ) : (
        <>
          <svg id="verticalLine">
            <line x1="6" y1="0" x2="6" y2="40"></line>
          </svg>
          <button
            className="post-button"
            type="button"
            onClick={() => navigate(token ? "/submit" : "/login")}
          />
        </>
      )}
    </section>
  );
};

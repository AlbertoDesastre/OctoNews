import { useContext, useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLocationParams } from "../hooks/useLocationParams";
import { convertSearchParamsToObject } from "../utils/ConvertSearchParamsToObject";
import "./FilterAndPostNews.css";

export const FilterAndPostNews = ({ className }) => {
  const { token } = useContext(AuthContext);
  const [currentLocation, sortParam, dateParam] = useLocationParams();
  const [selectedSortNews, setSelectedSortNews] = useState(sortParam);
  const [selectedSortDate, setSelectedSortDate] = useState(dateParam);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedSortNews(sortParam);
  }, [sortParam]);

  useEffect(() => {
    setSelectedSortDate(dateParam);
  }, [dateParam]);

  const handleSortNewsOnChange = (e) => {
    if (currentLocation === "search") {
      setSelectedSortNews(e.target.value);
      //If location is search we get the queryparam "q" and convert it to object
      let { q } = convertSearchParamsToObject(searchParams);
      //Then we make a new object  with q and sort params which is the actual value of <select>
      const params = {
        q,
        sort: e.target.value,
      };
      //we assign "params" object to search params with "createSearchParams"
      setSearchParams(createSearchParams(params));
    } else if (currentLocation === "category") {
      setSelectedSortNews(e.target.value);
      //if location is category we only need to do an object with sort param from value of <select>
      const params = {
        sort: e.target.value,
      };
      setSearchParams(createSearchParams(params));
    } else {
      navigate(`/${e.target.value}`);
    }
  };

  const handleSortDateOnChange = (e) => {
    setSelectedSortDate(e.target.value);
    if (currentLocation === "search" || currentLocation === "category") {
      //if it's search or category we make a new date param with the value of <select>
      let params = convertSearchParamsToObject(searchParams);
      //If we change the date <select> means we are always on "?sort=top" so we
      //convert all params we have in our URL into an object and replace the new date param
      params.t = e.target.value;
      setSearchParams(createSearchParams(params));
    } else {
      setSelectedSortDate(e.target.value);
      setSearchParams({ t: e.target.value });
    }
  };

  return (
    <section className={`filterAndPost ${className ? className : ""}`}>
      <select
        className={`filter ${selectedSortNews}`}
        name="filter"
        id="filter"
        value={selectedSortNews}
        onChange={handleSortNewsOnChange}
      >
        <option value="new">New</option>
        <option value="top">Top</option>
      </select>
      {selectedSortNews === "top" ? (
        <select
          className="filter-date"
          name="filter-date"
          id="filter-date"
          value={selectedSortDate}
          onChange={handleSortDateOnChange}
        >
          <option value="all">All time</option>
          <option value="today">Today</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      ) : (
        ""
      )}
      {className !== "search-page" && token && (
        <>
          <svg id="verticalLine">
            <line x1="6" y1="0" x2="6" y2="40"></line>
          </svg>
          <button
            className="post-button"
            type="button"
            onClick={() => navigate("/submit")}
          />
        </>
      )}
    </section>
  );
};

import "./FilterAndPostNews.css";

export const FilterAndPostNews = () => {
  return (
    <div className="filterAndPost">
      <select name="filter" id="filter">
        <option>Most votes</option>
        <option>Recent</option>
      </select>
      <select name="filter-date" id="filter-date">
        <option>Today</option>
        <option>Yesterday</option>
      </select>
      <svg id="verticalLine">
        <line x1="20" y1="20" x2="20" y2="70"></line>
      </svg>
      <button type="button">+</button>
    </div>
  );
};

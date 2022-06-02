import { useLocation } from "react-router-dom";
import { useQueryParams } from "./useQueryParams";

export const useGetFilters = () => {
  const { pathname } = useLocation();
  const queryParams = useQueryParams();
  //Action to dispatch (new, top or search)
  let filterAction;
  //Sort method (new, top)
  let sortFilter;

  //if pathname is search we get the sortFilter if exists from queryparams
  if (pathname === "/search") {
    sortFilter = queryParams.get("sort") ? queryParams.get("sort") : "new";
  } else {
    //if pathname is not /search (which will be "/", "/new" or "/top") we get sortfilter from pathname
    sortFilter = pathname.slice(1) !== "top" ? "new" : pathname.slice(1);
  }
  //We always get the filterAction from pathname
  filterAction = pathname.slice(1) === "" ? "new" : pathname.slice(1);

  // if exists we get date from queryparams
  const dateFilter = queryParams.get("t") ? queryParams.get("t") : "today";

  return [filterAction, dateFilter, sortFilter];
};

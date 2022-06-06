import { useLocation } from "react-router-dom";
import { useQueryParams } from "./useQueryParams";

export const useGetFilters = () => {
  const { pathname } = useLocation();
  const queryParams = useQueryParams();
  //Action to dispatch in fetch (new, top, search or category)
  let filterAction;
  //Sort method (new, top)
  let sortFilter;

  //Now, based on the location of the URL we assign filterAction and sortFilter

  //SORTFILTER
  //if pathname is search or category we get the sortFilter if exists from queryparams
  if (
    pathname.slice(1) === "search" ||
    pathname.slice(1).includes("category")
  ) {
    sortFilter = queryParams.get("sort") ? queryParams.get("sort") : "new";
  } else {
    //if pathname is not search (which will be "", "new" or "top") we get sortFilter from pathname
    sortFilter = pathname.slice(1) !== "top" ? "new" : pathname.slice(1);
  }

  //FILTERACTION
  //if pathname includes category, we split the string into 2 and take the first part of it which will be "category"
  if (pathname.slice(1).includes("category")) {
    const pathnameSplitted = pathname.slice(1).split("/");
    filterAction = pathnameSplitted[0];
  } else {
    //if it's not category we just get the pathname. And if it's "" will be always "new"
    filterAction = pathname.slice(1) === "" ? "new" : pathname.slice(1);
  }

  // if exists we get date from queryparams
  const dateFilter = queryParams.get("t") ? queryParams.get("t") : "today";

  return [filterAction, dateFilter, sortFilter];
};

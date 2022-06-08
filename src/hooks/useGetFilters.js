import { useLocation } from "react-router-dom";
import { useQueryParams } from "./useQueryParams";

export const useGetFilters = () => {
  const { pathname } = useLocation();
  const queryParams = useQueryParams();
  //Location needed to fetch (new, top, search or category)
  let currentLocation;
  //Sort method (new, top)
  let sortFilter;

  //Now, based on the URL we assign currentLocation and sortFilter

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

  //CURRENTLOCATION
  //if pathname includes category, we split the string into 2 and take the first part of it which will be "category"
  if (pathname.slice(1).includes("category")) {
    const pathnameSplitted = pathname.slice(1).split("/");
    currentLocation = pathnameSplitted[0];
  } else {
    //if it's not category we just get the pathname. And if it's "" will be always "new"
    currentLocation = pathname.slice(1) === "" ? "new" : pathname.slice(1);
  }

  // if exists we get date from queryparams
  const dateFilter = queryParams.get("t") ? queryParams.get("t") : "today";

  return [currentLocation, dateFilter, sortFilter];
};

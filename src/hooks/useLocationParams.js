import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const useLocationParams = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [currentLocation, setCurrentLocation] = useState();
  const [sortParam, setSortParam] = useState();
  const [dateParam, setDateParam] = useState();
  const [queryParam, setQueryParam] = useState();

  useEffect(() => {
    //SORTPARAM
    //if pathname is search or category we get the sortParam if exists from queryparams
    if (
      pathname.slice(1) === "search" ||
      pathname.slice(1).includes("category")
    ) {
      setSortParam(searchParams.get("sort") ? searchParams.get("sort") : "new");
    } else {
      //if pathname is not search (which will be "", "new" or "top") we get sortParam from pathname
      setSortParam(pathname.slice(1) !== "top" ? "new" : pathname.slice(1));
    }

    //CURRENTLOCATION
    //if pathname includes category, we split the string into 2 and take the first part of it which will be "category"
    if (pathname.slice(1).includes("category")) {
      const pathnameSplitted = pathname.slice(1).split("/");
      setCurrentLocation(pathnameSplitted[0]);
    } else {
      //if it's not category we just get the pathname. And if it's "" will be always "new"
      setCurrentLocation(pathname.slice(1) === "" ? "new" : pathname.slice(1));
    }

    // if exists we get date from queryparams
    setDateParam(searchParams.get("t") ? searchParams.get("t") : "all");

    // if exists we get queryText from queryparams
    setQueryParam(searchParams.get("q") ? searchParams.get("q") : null);
  }, [pathname, searchParams]);

  return [currentLocation, sortParam, dateParam, queryParam];
};

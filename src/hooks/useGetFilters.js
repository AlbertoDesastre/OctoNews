import { useLocation } from "react-router-dom";
import { useQuery } from "./useQuery";

export const useGetFilters = () => {
  const { pathname } = useLocation();
  const filterNewsBy = pathname.slice(1) === "" ? "new" : pathname.slice(1);
  const queryParams = useQuery();
  const dateFilter = queryParams.get("t") ? queryParams.get("t") : "today";

  return [filterNewsBy, dateFilter];
};

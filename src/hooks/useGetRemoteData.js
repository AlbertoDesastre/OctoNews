import { useEffect, useState } from "react";

export const useGetRemoteData = (url, callback) => {
  const [value, setValue] = useState([]);
  useEffect(() => {
    callback(url, setValue);
  }, [url, callback]);
  return [value, setValue];
};

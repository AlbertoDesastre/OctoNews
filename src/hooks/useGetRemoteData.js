import { useEffect, useState } from "react";
import { get } from "../utils/api";

export const useGetRemoteData = (url) => {
  const [value, setValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const getRemoteData = async (url) => {
      try {
        setIsLoading(true);
        await get(url, setValue);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getRemoteData(url);
  }, [url]);

  return [value, setValue, isLoading, error];
};

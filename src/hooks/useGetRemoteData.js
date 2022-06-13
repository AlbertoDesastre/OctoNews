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
      } catch {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getRemoteData(url);
  }, [url]);

  /* Por algún motivo los comentarios no se renderizan automáticamente */
  const addAdditionalValue = (someValue) => {
    setValue([someValue, ...value]);
  };

  const deleteSomeValueAndRefreshIt = (idOfSomethingBeingDeleted) => {
    setValue(
      value.filter((someValue) => someValue.id !== idOfSomethingBeingDeleted)
    );
  };

  return [
    value,
    setValue,
    isLoading,
    error,
    addAdditionalValue,
    deleteSomeValueAndRefreshIt,
  ];
};

import { useState } from "react";
import { useEffect } from "react";

export default function useFetch(fetchFn, initialValue = []) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        const data = await fetchFn();
        setFetchedData(data);
        setIsFetching(false);
      } catch (error) {
        setError({
          message:
            error.message || 'Could not fetch data.',
        });
        setIsFetching(false);
      }
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    error,
    fetchedData,
    setFetchedData
  };
}

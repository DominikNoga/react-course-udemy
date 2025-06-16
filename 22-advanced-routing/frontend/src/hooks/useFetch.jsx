import { useEffect, useState } from 'react';

export default function useFetch(fetchFn, initialData = [], propName = 'data', fetchFnArgs = []) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchFn(...fetchFnArgs);
        setData(fetchedData[propName]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFn]);

  return {
    loading,
    error,
    data
  };
}

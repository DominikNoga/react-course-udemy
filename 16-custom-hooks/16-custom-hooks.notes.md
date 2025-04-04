# Custom hooks

## Rules of hooks
- You can use hooks only inside the component functions or iniside other hooks.
- Only call hooks at the top level, not inside the if's or loops.
- Functions that are used to define hooks has to start with 'use'

## Why to use them?
They are needed in order to wrap and reuse logic inside of the components that does not include jsx code.
So jsx reuse is job of the components and logic is for hooks.

## How to create them
Hooks are just a functions that names starts with 'use'.
They have access to other react hooks and can perform some logic.
````jsx
import { useState } from "react";
import { useEffect } from "react";

export default function useFetch(fetchFn, initialValue = []) {
  // We are managing state inside of the custom hook,
  // And later we are using this state in other components
  // State in each component is independent
  // We also can return state updating function fom our hook and use it in components

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
````

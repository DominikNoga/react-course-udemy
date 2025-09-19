# TanStack Query (prev React Query)
- TanStack Query is a powerful data-fetching library for React applications, designed to simplify the process of managing server state and caching.
- It is created to help developers with tasks that they often need in bigger applications, such as:
  - Fetching data from APIs
  - Caching and synchronizing server state
  - Handling background updates
  - Managing loading and error states

## Instalation
```bash
npm i @tanstack/react-query
```

## Querying Data
- TanstackQuery does not provide a built-in way to fetch data, so you can use any data-fetching library you prefer, such as `fetch`, `axios`, etc.
- It comes with logic that can manage the data, the actual state of the request, and caching and way more.

## Setting Up the Query Client
- To use TanStack Query in your React application, you need to set up a `QueryClient` and wrap your application with the `QueryClientProvider`.
```tsx

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

## Basic Usage
In order to use a tanstack query we need to use a special hook called `useQuery`.
```tsx
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../utils/http.js';

export default function NewEventsSection() {
  const { data, error, isPending } = useQuery({
    // Unique key for the query, needed for caching and refetching
    // This is an array, that are stored internally by react-query
    // The key does not need to be string only, it can be any serializable value
    queryKey: ['events'],
    // Some function that returns a promise
    queryFn: fetchEvents,
  });

  // ...
}
```
### Passing Parameters to the Query Function
- The `queryFn` function receives an object as a parameter, which contains the `queryKey` and a `signal` property.
- The `signal` property is an `AbortSignal` that can be used to cancel the request if needed.
```tsx
// a dynamic parameter example
const searchTerm = 'some search term';
const { data, isError, isPending, error } = useQuery({
  queryFn: (params) => fetchEvents({ ...params, searchTerm }),
  queryKey: ['events', {search: searchTerm}],
});
```

## Caching
- TanStack Query automatically caches the results of your queries based on the `queryKey
- thanks to this the data are available instantly when you navigate back to a component that has already fetched the data.
- but in the background, it will refetch the data to ensure that you have the most up-to-date information. And if the data has changed, it will update the UI accordingly.
- Caching can be configured using the following options:
```tsx
const { data, isError, isPending, error } = useQuery({
    queryFn: fetchEvents,
    queryKey: ['events'],
    // how long the tanstack query should wait to send the request for the data again
    // So for example, if you set it to 5 minutes, then if you navigate away from the component and come back within 5 minutes,
    // it will use the cached data and not send a new request.
    // But if you come back after 5 minutes, it will send a new request to fetch the data again.
    // This is useful for data that doesn't change very often, as it can help reduce the number of requests sent to the server.
    staleTime: 10 * 1000, // 10 seconds
     // how long the cached data should be kept in memory before it is garbage collected
    // So for example, if you set it to 5 minutes, then if you navigate away from the component and come back within 5 minutes,
    // it will use the cached data and not send a new request.
    gcTime: 5 * 60 * 1000, // 5 minutes 
  });
```

## My Questions
- how the caching works under the hood?
- why the queryKey is an array and what are the possible values?

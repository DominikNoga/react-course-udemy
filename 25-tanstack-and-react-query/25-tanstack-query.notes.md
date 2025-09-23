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
In order to use a tanstack query we need to use a special hook called `useQuery` which is only used for getting data.
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

## Passing key as a parameter
- The `queryKey` can be any serializable value, not just a string.
- We can use the key to pass parameters to the query function.
- This is useful when you want to fetch data based on some dynamic parameters.
```tsx
const { data, isError, isPending, error } = useQuery({
  queryKey: ['events', {search: searchTerm}],
  queryFn: ({signal, queryKey}) => fetchEvents({ signal, ...queryKey[1] }),
});
```

## Handling data submission/Mutations
- For handling data submission or mutations (like POST, PUT, DELETE requests), TanStack Query provides the `useMutation` hook.
- This hook is designed to manage the state of these operations, including loading and error states.
- It is optimised compared to useQuery, because it does not automatically send the request on mount. Insted, it provides a `mutate` function that you can call,when you want to perform the mutation.
- we can add the key to the mutatation, but it is not required, because mutations are not cached like queries.
- because we rather change something on the server, not stroing this locally.

```tsx
function Component() {
  const { mutate, isPending, isError, error } = useMutation({
    // request handler function that returns a promise
    mutationFn: createNewEvent,
    // like the name suggests, this function will be called when the mutation is successful
    onSuccess: () => {
      // Invalidate the 'events' query to refetch the data
      // The success won't cause the refetching, but the invalidation will
      queryClient.invalidateQueries({
        // all the queries with this key will be invalidated, even those that only partially match the key
        queryKey: ['events']
      })
      navigate('../');
    }
  });

  function handleSubmit(eventData) {
    // Call the mutate function to perform the mutation
    mutate({
      event: eventData
    });
  }
}
```

## Optimistic Updates
- Optimistic updates are a technique used to improve the user experience by updating the UI immediately, before the server confirms that the operation was successful.
- This can make the application feel more responsive, as users see the changes right away, rather than waiting for a server response.
- To implement optimistic updates with TanStack Query, you can use the `onMutate`, `onError`, and `onSettled` callbacks provided by the `useMutation` hook.
```tsx
const { mutate, isPending: isEditingEvent } = useMutation({
    mutationFn: (formData) => editEvent({ ...formData, id }),
    // onSuccess: () => {
    //   // Navigate back to the event details page after successful edit
    //   queryClient.invalidateQueries({ queryKey: ['events', id] });
    //   navigate(`../`);
    // },
    onMutate: async (eventData) => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      // this will only cancel useQuery fetches not useMutation
      await queryClient.cancelQueries({ queryKey: ['events', id] });
      const previousEvent = queryClient.getQueryData(['events', id]);
      // Optimistic update
      queryClient.setQueryData(['events', id], (oldEvent) => ({ ...oldEvent, ...eventData, id }));
      // context that will be available in onError callback
      return { previousEvent };
    },
    onError: (err, newEvent, context) => {
      queryClient.setQueryData(['events', id], context.previousEvent);
    },
    onSettled: () => {
      // this will run whether the mutation fails or succeeds
      // Invalidate the event query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ['events', id] });
    },
  });
```

## My Questions
- how the caching works under the hood?
- why the queryKey is an array and what are the possible values?
- difference between isLoading and isPending?
- read more about optimistic updates and it's pros and cons

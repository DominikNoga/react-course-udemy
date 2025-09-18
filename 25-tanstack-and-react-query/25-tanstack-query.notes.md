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


## My Questions
- how the caching works under the hood?
- why the queryKey is an array and what are the possible values?

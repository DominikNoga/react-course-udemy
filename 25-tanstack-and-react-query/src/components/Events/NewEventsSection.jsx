import { useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../utils/http.js';

export default function NewEventsSection() {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ['events', {  max: 3 }],
    queryFn: ({signal, queryKey}) => fetchEvents({ signal,  ...queryKey[1] }),
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

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message || 'Unknown error occurred'} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}

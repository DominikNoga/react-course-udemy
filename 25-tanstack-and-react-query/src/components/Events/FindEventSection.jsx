import { useRef, useState } from 'react';
import { fetchEvents } from '../../utils/http';
import { useQuery } from '@tanstack/react-query';
import FetchedContentWrapper from '../UI/FetchedContentWrapper';
import EventItem from './EventItem';

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['events', {search: searchTerm}],
    queryFn: (params) => fetchEvents({
      ...params,
      searchTerm,
    }),
    enabled: searchElement.current !== undefined,
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      <p>Please enter a search term and to find events.</p>
      <FetchedContentWrapper isLoading={isLoading} isError={isError} error={error}>
        <ul className="events-list">
          {data?.map(event => (
            <li key={event.id}><EventItem event={event} /></li>
          ))}
        </ul>
      </FetchedContentWrapper>
    </section>
  );
}

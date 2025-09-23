import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation } from '@tanstack/react-query';
import { deleteEvent, queryClient } from '../../utils/http.js';
import FetchedContentWrapper from '../UI/FetchedContentWrapper.jsx';
import { API_URL } from '../../const/const.js';
import useGetEventById from '../../hooks/useGetEventById.jsx';

export default function EventDetails() {
  const { id } = useParams();
  const { data: event, isPending, isError, error } = useGetEventById(id);
  const navigate = useNavigate();

  const { mutate: deleteEventMutation, isPending: isDeletingEvent } = useMutation({
    mutationFn: () => deleteEvent({id}),
    onSuccess: () => {
      // Invalidate the query to refetch the events
      queryClient.invalidateQueries({
        queryKey: ['events'],
        // existing queries will not be invalidated immediately, they will invalidate when they are needed next time
        refetchType: 'none',
        // default is 'all', which means all existing queries with the same key will be invalidated immediately
        // refetchType: 'all',
      });
      navigate('/events');
    },
  });

  const handleDeleteEvent = () => {
    const proceed = window.confirm('Are you sure you want to delete this event?');
    if (!proceed) return;
    deleteEventMutation();
  };

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {
        <FetchedContentWrapper isLoading={isPending} isError={isError} error={error}>
          <article id="event-details">
            <header>
              <h1>{event?.title}</h1>
              <nav>
                <button onClick={handleDeleteEvent} disabled={isDeletingEvent}>Delete</button>
                <Link to="edit">Edit</Link>
              </nav>
            </header>
            <div id="event-details-content">
              <img src={`${API_URL}/${event?.image}`} alt={event?.title} />
              <div id="event-details-info">
                <div>
                  <p id="event-details-location">{event?.location}</p>
                  <time dateTime={`${event?.date} ${event?.time}`}></time>
                </div>
                <p id="event-details-description">{event?.description}</p>
              </div>
            </div>
          </article>
        </FetchedContentWrapper>
      }
    </>
  );
}

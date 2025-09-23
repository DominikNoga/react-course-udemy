import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import useGetEventById from '../../hooks/useGetEventById.jsx';
import FetchedContentWrapper from '../UI/FetchedContentWrapper.jsx';
import { useMutation } from '@tanstack/react-query';
import { editEvent, queryClient } from '../../utils/http.js';

export default function EditEvent() {
  const { id } = useParams();
  const { data: event, isPending, isError, error } = useGetEventById(id);
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
  const navigate = useNavigate();

  function handleSubmit(formData) {
    mutate(formData);
    navigate(`../`);
  }

  function handleClose() {
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      <FetchedContentWrapper isLoading={isPending} isError={isError} error={error}>
        <EventForm inputData={event || null} onSubmit={handleSubmit}>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            {  isEditingEvent ? 'Editing...' : 'Update' }
          </button>
        </EventForm>
      </FetchedContentWrapper>
    </Modal>
  );
}

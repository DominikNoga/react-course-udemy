import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent, queryClient } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events']
      })
      navigate('../');
    }
  });

  function handleSubmit(eventData) {
    mutate({
      event: eventData
    });
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Creating event...'}
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
      </EventForm>
      {isError && <ErrorBlock title='Error creating event' message={error.info?.message || 'Unknown error'} />}
    </Modal>
  );
}

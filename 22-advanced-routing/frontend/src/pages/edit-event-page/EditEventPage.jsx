import React from 'react'
import EventForm from '../../components/EventForm';
import { useRouteLoaderData } from 'react-router-dom';
import { EVENT_DETAILS_ID } from '../../App';

export default function EditEventPage() {
  const { event } = useRouteLoaderData(EVENT_DETAILS_ID);

  return (
    <EventForm event={event} />
  )
}

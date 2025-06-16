import React from 'react'
import EventForm from '../../components/EventForm'
import { addEvent } from '../../utils/events-service/events-service'
import { redirect,  } from 'react-router-dom';

export default function NewEventPage() {
  return (
    <EventForm />
  )
}

export async function action({request}) {
  const data = await request.formData();
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };
  try {
    const response  = await addEvent(eventData);
    if (response.status === 422) {
      return response;
    }
    return redirect('/events');
  } catch(error) {
    throw new Response(error.message, {status: 500});
  }
}

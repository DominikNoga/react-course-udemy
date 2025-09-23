import { QueryClient } from "@tanstack/react-query";
import { API_URL } from "../const/const";

export const queryClient = new QueryClient();

const EVENTS_URL = `${API_URL}/events`;

export async function fetchEvents({ signal, searchTerm, max }) {
  let searchParams = searchTerm || max ? '?' : '';
  searchParams += `${searchTerm ? `?search=${searchTerm}` : ''}${max ? `&max=${max}` : ''}`;
  const response = await fetch(`${EVENTS_URL}${searchParams}`, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(eventData) {
  const response = await fetch(EVENTS_URL, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function editEvent(eventData) {
  const response = await fetch(`${EVENTS_URL}/${eventData.id}`, {
    method: 'PUT',
    body: JSON.stringify({event: eventData}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function fetchImages({ signal }) {
  const response = await fetch(`${EVENTS_URL}/images`, { signal });
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the images');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  
  const { images } = await response.json();
  return images;
}

export async function getEventById({ id, signal }) {
  const response = await fetch(`${EVENTS_URL}/${id}`, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function deleteEvent({ id }) {
  const response = await fetch(`${EVENTS_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
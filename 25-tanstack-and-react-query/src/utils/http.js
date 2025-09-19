// the s
export async function fetchEvents({ signal, searchTerm }) {
  const searchParams = `${searchTerm ? `?search=${searchTerm}` : ''}`;
  const response = await fetch(`http://localhost:3000/events${searchParams}`, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}
import EventsList from "../../components/EventsList";
import { useLoaderData } from "react-router-dom";
import { getAllEvents } from "../../utils/events-service/events-service";

export default function EventsPage() {

  const { events } = useLoaderData();

  return (
    <div>
      <h1>Events Page</h1>
      <EventsList events={events} />
    </div>
  )
}

export async function loader() {
  try {
    const eventsData = await getAllEvents();
    return {
      events: eventsData.events,
    };
  } catch (error) {
    console.log(error.message)
    throw new Response(
      error.message + ' Please try again later.',
      {status: 500}
    )
  }
}

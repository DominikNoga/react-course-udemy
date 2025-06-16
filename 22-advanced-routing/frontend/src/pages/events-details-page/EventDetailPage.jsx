import { redirect, useRouteLoaderData } from "react-router-dom"
import EventItem from "../../components/EventItem";
import { deleteEvent, getEventById } from "../../utils/events-service/events-service";
import { EVENT_DETAILS_ID } from "../../App";

export default function EventDetailPage() {
  const { event } = useRouteLoaderData(EVENT_DETAILS_ID);

  return (
    <div>
      <h1>Event Detail Page</h1>
      <EventItem event={event} />
    </div>
  )
}

export async function loader({ request, params }) {
  console.log(params)
  try {
    const eventData = await getEventById(params.eventId);
    return {
      event: eventData.event,
    };
  } catch (error) {
    console.log(error.message)
    throw new Response(
      error.message + ' Please try again later.',
      { status: 500 }
    )
  }
}

export async function action({params}) {
  const { eventId } = params;
  try {
    deleteEvent(eventId);
    return redirect('/events');
  } catch (error) {
    throw new Response(
      error.message,
      { status: 500 }
    )
  }
}
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/main-layout/MainLayout';
import HomePage from './pages/home-page/HomePage';
import EventsPage, { loader as eventsLoader } from './pages/events-page/EventsPage';
import EventDetailPage, { loader as eventDetailsLoader, action as deleteEventAction } from './pages/events-details-page/EventDetailPage';
import NewEventPage from './pages/new-event-page/NewEventPage';
import EditEventPage from './pages/edit-event-page/EditEventPage';
import ErrorPage from './components/error-page/ErrorPage';
import EventsPageLayout from './components/event-page-layout/EventsPageLayout';
import { eventFormAction } from './components/EventForm';

export const EVENT_DETAILS_ID = 'event-detail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventsPageLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: EVENT_DETAILS_ID,
            loader: eventDetailsLoader,
            children: [
              {
                index: true,
                action: deleteEventAction,
                element: <EventDetailPage />,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: eventFormAction,
              }
            ]
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: eventFormAction
          },

        ],
      },
    ],
  }]
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

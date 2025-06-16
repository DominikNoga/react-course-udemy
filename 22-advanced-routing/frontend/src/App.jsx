// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/main-layout/MainLayout';
import HomePage from './pages/home-page/HomePage';
import EventsPage, { loader as eventsLoader } from './pages/events-page/EventsPage';
import EventDetailPage, { loader as eventDetailsLoader, action as deleteEventAction } from './pages/events-details-page/EventDetailPage';
import NewEventPage, { action as newEventAction } from './pages/new-event-page/NewEventPage';
import EditEventPage from './pages/edit-event-page/EditEventPage';
import ErrorPage from './components/error-page/ErrorPage';
import EventsPageLayout from './components/event-page-layout/EventsPageLayout';

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
              }
            ]
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: newEventAction
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

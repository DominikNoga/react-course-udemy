import { Outlet } from 'react-router-dom'
import EventsNavigation from '../EventsNavigation'

export default function EventsPageLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  )
}

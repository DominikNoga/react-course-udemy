import { Outlet } from 'react-router-dom'
import Nav from '../../shared/components/Nav/Nav'

export default function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  )
}

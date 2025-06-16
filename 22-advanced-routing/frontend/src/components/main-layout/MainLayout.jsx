import { Outlet, useNavigation } from 'react-router-dom'
import MainNavigation from '../MainNavigation'

export default function EventsPageLayout() {
  const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main style={{
        margin: 'auto',
        maxWidth: '60rem',
      }}>
        { navigation.state  === 'loading' && (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        )}
        <Outlet />
      </main>
    </>
  )
}

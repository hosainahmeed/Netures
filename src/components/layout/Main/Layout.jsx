import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../../../pages/Sheard/Footer'
import Header from '../../../pages/Sheard/Header'

function Layout () {
  const location = useLocation()
  const visual =
    location.pathname.toLowerCase() === '/login' ||
    location.pathname.toLowerCase() === '/register'
  if (visual) {
    return <Outlet></Outlet>
  }
  return (
    <>
      <Header/>
      <Outlet></Outlet>
      <Footer/>
    </>
  )
}

export default Layout

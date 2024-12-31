import { Spin } from 'antd'
import useAuth from '../hook/useAuth'
import { Navigate, useLocation } from 'react-router'

function PrivateRouter ({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin />
      </div>
    )
  }

  if (user) {
    return children
  }

  return <Navigate to='/login' state={{ from: location }} replace />
}

export default PrivateRouter

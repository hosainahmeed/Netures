import { useQuery } from '@tanstack/react-query'
import { Alert, Skeleton, Spin } from 'antd'
import axios from 'axios'
import useAuth from '../../hook/useAuth'
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2'
import SectionTitle from '../../component/utils/SectionTitle'

function BookedTravele () {
  const { user, loading } = useAuth()
  const {
    data: bookingsData = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['booking'],
    enabled: !!user && !loading,
    queryFn: async () => {
      const response = await axios.get(
        `https://bangladesh-adv-server.vercel.app/bookings/${user.email}`
      )
      return response.data
    }
  })

  const handleDelete = async id => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        iconColor: 'red',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#000',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.isConfirmed) {
          axios
            .delete(
              `https://easy-service-server-81jmoxc7b-hosains-projects-1e2169e4.vercel.app/bookings/${id}`
            )
            .then(res => {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your Booking service has been deleted.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
              }).then(() => {
                refetch()
              })
            })
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className='p-4 flex items-center justify-center md:flex-row flex-col'
          >
            <Skeleton.Image />
            <Skeleton avatar paragraph={{ rows: 4 }} />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return <Alert message='Error loading services' type='error' showIcon />
  }

  if (bookingsData.length === 0) {
    return (
      <div className='h-screen'>
        <Alert message='No bookings available.' type='info' showIcon />
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <Helmet>
        <title>Easy Service | Booked Service</title>
      </Helmet>
      <SectionTitle title={'My Bookings'}></SectionTitle>
      <div className='overflow-x-auto p-4'>
        <table className='table-auto w-full border-collapse border bg-white text-black border-gray-300'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border border-gray-300 p-2 text-left'>Image</th>
              <th className='border border-gray-300 p-2 text-left'>
                Service Name
              </th>
              <th className='border border-gray-300 p-2 text-left'>
                Booked By
              </th>
              <th className='border border-gray-300 p-2 text-left'>Email</th>
              <th className='border border-gray-300 p-2 text-left'>Status</th>
              <th className='border border-gray-300 p-2 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookingsData.map(service => (
              <tr
                key={service._id}
                className=' bg-white text-[#222] hover:bg-gray-50'
              >
                <td className='border border-gray-300 p-2'>
                  <img
                    src={service.serviceImage}
                    alt={service.serviceName}
                    className='h-16 w-16 rounded-full object-cover'
                  />
                </td>
                <td className='border border-gray-300 p-2'>
                  {service.serviceName}
                </td>
                <td className='border border-gray-300 p-2'>
                  {service.userName}
                </td>
                <td className='border border-gray-300 p-2'>
                  {service.userEmail}
                </td>
                <td
                  className={`border border-gray-300 p-2 font-bold ${
                    service.serviceStatus === 'working'
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {service.serviceStatus}
                </td>
                {service.serviceStatus === 'completed' ? (
                  <td className='border border-gray-300 p-2'>
                    <button
                      disabled
                      className={`px-4 py-2 text-white rounded transition ${
                        service.serviceStatus === 'completed'
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-500'
                      }`}
                    >
                      {service.serviceStatus === 'pending'
                        ? 'Remove'
                        : 'Complete'}
                    </button>
                  </td>
                ) : (
                  <td className='border border-gray-300 p-2'>
                    <button
                      disabled={service.serviceStatus === 'working'}
                      onClick={() => handleDelete(service._id)}
                      className={`px-4 py-2 text-white rounded transition ${
                        service.serviceStatus === 'working'
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-500'
                      }`}
                    >
                      {service.serviceStatus === 'pending' ? (
                        'Remove'
                      ) : (
                        <>
                          <Spin></Spin>Service Received...
                        </>
                      )}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookedTravele

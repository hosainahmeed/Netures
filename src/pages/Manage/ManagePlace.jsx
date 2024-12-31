import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from 'react'
import { Skeleton, Alert, Pagination, Input } from 'antd'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import useAuth from '../../hook/useAuth'

function ManagePlace () {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const { user, loading } = useAuth()
  const {
    data: itemsData = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['manage', user?.email],
    enabled: !!user.email && !loading,
    queryFn: async () => {
      const response = await axios.get('https://bangladesh-adv-server.vercel.app/all-carts')
      return response.data
    }
  })

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)
    return () => clearTimeout(debounceTimeout)
  }, [searchTerm])

  const handlePageChange = (page, size) => {
    setCurrentPage(page)
    setPageSize(size)
  }

  const filteredItems = itemsData.filter(item =>
    item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  )

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {Array.from({ length: pageSize }).map((_, idx) => (
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
    return <Alert message={`Error loading services`} type='error' showIcon />
  }

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
              `https://bangladesh-adv-server.vercel.app/delete-carts/${id}`
            )
            .then(res => {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your Service has been deleted.',
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

  return (
    <div className='px-4 min-h-screen md:px-8 lg:px-16'>
      <div>
        <Input
          onChange={e => setSearchTerm(e.target.value)}
          placeholder={`Search services...`}
          className='border-2 bg-white dark:text-[#222] border-[#222] my-5 p-3 outline-none'
        />
      </div>
      {filteredItems.length > 0 ? (
        <div className='grid grid-cols-1 lg:grid-cols-1 gap-4'>
          {paginatedItems.map(item => (
            <div
              key={item._id}
              className='shadow-sm p-4 dark:shadow-white rounded-md flex flex-col justify-between md:flex-row items-center gap-4'
            >
              <div className='flex items-start gap-2'>
                <img
                  className='w-full md:w-48 h-32 object-cover rounded-md'
                  src={item.image}
                  alt={item.title}
                />
                <div className='flex-1'>
                  <h1 className='text-xl font-semibold'>{item.title}</h1>
                  <h1 className='text-lg font-normal'>
                    {item.shortDescription}
                  </h1>
                  <p className='text-sm text-green-600 font-semibold'>
                    ${item.adventureCost}
                  </p>
                </div>
              </div>
                <button onClick={()=>handleDelete(item._id)}  className='btn'>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center min-h-screen h-40'>
          <p className='text-lg text-gray-500'>No services found.</p>
        </div>
      )}
      {itemsData.length > 0 && (
        <div className='flex justify-center mt-6'>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredItems.length}
            showSizeChanger
            onChange={handlePageChange}
            pageSizeOptions={[6, 9]}
          />
        </div>
      )}
    </div>
  )
}

export default ManagePlace





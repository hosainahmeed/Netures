import { useNavigate, useLoaderData } from 'react-router-dom'
import { motion } from 'framer-motion'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { useEffect } from 'react'
import { Button } from 'antd'
import useAuth from '../../hook/useAuth'
import Swal from 'sweetalert2'
import axios from 'axios'

function AdventureDetails () {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  const data = useLoaderData()
  const { user } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    AOS.init()
  }, [])

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='flex items-center justify-center h-screen'
      >
        <h1 className='text-3xl font-bold text-red-500'>Adventure not found</h1>
        <button
          onClick={() => navigate(-1)}
          className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600'
        >
          Go Back
        </button>
      </motion.div>
    )
  }

  const {
    _id,
    title,
    image,
    category,
    shortDescription,
    adventureCost,
    bookingAvailability,
    location,
    duration,
    adventureLevel,
    includedItems,
    ecoFriendlyFeatures,
    specialInstructions
  } = data

  const handleBooking = async () => {
    try {
      const bookingData = {
        bookItemId: _id,
        title,
        image,
        category,
        adventureCost,
        serviceStatus: 'pending',
        email: user.email
      }
      const response = await axios.post(
        'https://bangladesh-adv-server.vercel.app/booking',
        bookingData,
        {
          withCredentials: true
        }
      )

      if (response.data.acknowledged) {
        Swal.fire({
          icon: 'success',
          title: 'Booking Successful',
          text: 'Your booking has been successfully submitted.',
          confirmButtonText: 'OK'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: 'Something went wrong. Please try again.',
        confirmButtonText: 'OK'
      })
      console.error('Error submitting booking:', error)
    }
  }

  const talkExpert = () => {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const startHour = 10
    const endHour = 20

    if (currentHour >= startHour && currentHour < endHour) {
      window.open('https://meet.google.com', '_blank')
    } else {
      const modal = document.getElementById('my_modal_5')
      modal.showModal()
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='container mx-auto px-2'
      >
        <button
          onClick={() => navigate(-1)}
          className='mt-4 px-6 py-2 mb-4 btn bg-white text-black btn-circle'
        >
          Back
        </button>
        <div className='flex flex-col gap-6'>
          <motion.img
            src={image}
            alt={title}
            className='w-full h-[600px] object-cover rounded-lg shadow-lg'
            transition={{ duration: 0.3 }}
            data-aos='fade-up'
          />
          <div className='flex-1' data-aos='fade-left'>
            <motion.h1
              className='text-4xl font-extrabold text-gray-800'
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>
            <p className='text-gray-600 mt-2'>{shortDescription}</p>
            <div className='mt-4'>
              <p>
                <span className='font-bold text-gray-700'>Category:</span>{' '}
                {category}
              </p>
              <p>
                <span className='font-bold text-gray-700'>Location:</span>{' '}
                {location}
              </p>
              <p>
                <span className='font-bold text-gray-700'>Duration:</span>{' '}
                {duration}
              </p>
              <p>
                <span className='font-bold text-gray-700'>
                  Adventure Level:
                </span>{' '}
                {adventureLevel}
              </p>
              <p
                className={`mt-2 ${
                  bookingAvailability === 'Available'
                    ? 'text-green-600'
                    : 'text-red-600'
                } `}
              >
                <span className='font-bold'>Availability:</span>{' '}
                {bookingAvailability}
              </p>
              <p className='text-gray-700 mt-4'>
                <span className='font-bold'>Cost:</span> ${adventureCost}
              </p>
            </div>
            <motion.div className='mt-4'>
              <h3 className='font-bold text-lg'>Included Items:</h3>
              <ul className='list-disc pl-5'>
                {includedItems.map((item, index) => (
                  <motion.li key={index}>{item}</motion.li>
                ))}
              </ul>
            </motion.div>
            <div className='mt-4'>
              <h3 className='font-bold text-lg'>Eco-Friendly Features:</h3>
              <ul className='list-disc pl-5'>
                {ecoFriendlyFeatures.map((feature, index) => (
                  <li
                    key={index}
                    data-aos='fade-right'
                    className='text-sm text-gray-700'
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <motion.button
              onClick={talkExpert}
              className='mt-6 px-6 py-3 bg-[#1B2433] text-white font-bold rounded hover:bg-[#1B2433]'
              whileTap={{ scale: 0.95 }}
            >
              Talk with Expert
            </motion.button>
            <Button
              size='large'
              disabled={!user}
              className='w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 px-6 shadow-md transition-all duration-300'
              onClick={() => handleBooking()}
            >
              Book Now
            </Button>
          </div>
        </div>
      </motion.div>

      <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Consultation Unavailable</h3>
          <p className='py-4'>
            Consultation is only available between <strong>10:00 AM</strong> and{' '}
            <strong>8:00 PM</strong>. Please try again during these hours or
            leave us a message.
          </p>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn bg-white text-black'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default AdventureDetails

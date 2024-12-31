import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import SectionTitle from '../ui/SectionTitle'

function Testimonals () {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const {
    data: reviewsData = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const result = await axios.get('http://localhost:5000/all-reviews')
      return result.data
    }
  })
  if (isLoading) {
    return <p>loading</p>
  }
  return (
    <div className='container mx-auto'>
      <SectionTitle
        subtitle={'Discover the thrill of adventure in Bangladesh!'}
        title={'Traveler Feedback'}
      ></SectionTitle>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className='mySwiper'
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }}
      >
        {reviewsData.map(review => (
          <SwiperSlide key={review._id}>
            <div className='bg-white rounded-lg p-4 flex flex-col items-center text-center shadow-lg'>
              <img
                src={review?.image}
                alt={review?.name}
                className='w-40 h-40 rounded-full object-cover mb-4'
              />
              <h3 className='text-lg font-semibold'>{review?.name}</h3>
              <p className='text-sm text-gray-600 mt-2'>{review?.review}</p>
              <p className='text-yellow-500 font-bold mt-3'>
                Rating: {review?.rating} &#9733;
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Testimonals

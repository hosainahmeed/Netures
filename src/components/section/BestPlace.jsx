import 'aos/dist/aos.css'
import AdventureCard from '../ui/AdventureCard.jsx'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router'
import SectionTitle from '../ui/SectionTitle.jsx'

function BestPlace () {
  const [filteredSells, setFilteredSells] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: cartsData = [], isLoading } = useQuery({
    queryKey: ['limit-carts'],
    queryFn: async () => {
      const result = await axios.get('https://bangladesh-adv-server.vercel.app/all-carts-limit')
      return result.data
    }
  })

  useEffect(() => {
    setFilteredSells(cartsData)
  }, [cartsData])

  const handleCategoryClick = category => {
    setSelectedCategory(category)
    setFilteredSells(
      category === ''
        ? cartsData
        : cartsData.filter(sall => sall.category === category)
    )
  }

  const toggleModal = () => {
    setIsModalOpen(prev => !prev)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const uniqueCategories = cartsData
    .map(salls => salls.category)
    .filter((value, index, self) => self.indexOf(value) === index)

  return (
    <section id='adventure'>
      <SectionTitle
        subtitle={'Explore the best places for your adventure'}
        title={'Adventure Experiences'}
      ></SectionTitle>
      <div className='flex justify-between mb-4'>
        <button
          onClick={toggleModal}
          className='btn bg-white text-black md:hidden'
        >
          Filter
        </button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-md w-11/12 md:w-1/3'>
            <div className='mb-4'>
              <button
                className={`btn bg-white text-black ${
                  !selectedCategory ? 'bg-green-500 text-white' : ''
                } m-2`}
                onClick={() => handleCategoryClick('')}
              >
                All
              </button>
              {uniqueCategories.map(category => (
                <button
                  key={category}
                  className={`btn ml-2 ${
                    selectedCategory === category
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-black'
                  } m-2`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className='flex justify-end'>
              <button
                onClick={toggleModal}
                className='btn bg-white text-black btn-danger'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter buttons for larger screens */}
      <div className='hidden md:flex justify-between mb-4'>
        <div className='flex flex-wrap'>
          <button
            className={`px-4 py-3 ${
              !selectedCategory ? 'bg-green-500 text-white' : ''
            } m-3`}
            onClick={() => handleCategoryClick('')}
          >
            All
          </button>
          {uniqueCategories.map(category => (
            <button
              key={category}
              className={`btn rounded-none ml-2 ${
                selectedCategory === category ? 'border-b-green-500' : ''
              } mt-3`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Adventure cards display */}
      <div className='flex items-center justify-center md:justify-start'>
        <div className='my-12 grid grid-cols-1 md:grid-cols-3 gap-2'>
          {filteredSells.map(salls => (
            <AdventureCard key={salls._id} adventure={salls} />
          ))}
        </div>
      </div>
      <Link to={'/all-place'}>
        <button className='btn bg-green-500 text-white hover:bg-green-400'>
          Show All place
          <FaArrowRight />
        </button>
      </Link>
    </section>
  )
}

export default BestPlace

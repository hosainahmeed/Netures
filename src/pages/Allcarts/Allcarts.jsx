import 'aos/dist/aos.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import AdventureCard from '../../components/ui/AdventureCard'

function Allcarts () {
  const [filteredSells, setFilteredSells] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // Fetch data using React Query
  const { data: cartsData = [], isLoading } = useQuery({
    queryKey: ['limit-carts'],
    queryFn: async () => {
      const result = await axios.get('http://localhost:5000/all-carts')
      return result.data
    }
  })
  useEffect(() => {
    setFilteredSells(cartsData) 
  }, [cartsData])

  // Handlers
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

  // Loading state
  if (isLoading) {
    return <p>Loading...</p>
  }

  // Unique categories
  const uniqueCategories = cartsData
    .map(salls => salls.category)
    .filter((value, index, self) => self.indexOf(value) === index)

  return (
    <section id='adventure'>
      {/* Filter button for small screens */}
      <div className='flex justify-between mb-4'>
        <button
          onClick={toggleModal}
          className='btn bg-white text-black md:hidden'
        >
          Filter
        </button>
      </div>

      {/* Modal for category selection */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-md w-11/12 md:w-1/3'>
            <div className='mb-4'>
              <button
                className={`btn bg-white text-black ${
                  !selectedCategory ? 'bg-green-500 text-black' : ''
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
              !selectedCategory ? 'bg-green-500 text-black' : ''
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
      <div className='min-h-screen flex items-start justify-center md:justify-start'>
        <div className='my-12  grid grid-cols-1 md:grid-cols-3 gap-2'>
          {filteredSells.map(salls => (
            <AdventureCard key={salls._id} adventure={salls} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Allcarts

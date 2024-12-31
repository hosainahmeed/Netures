import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
function AdventurePlace () {
  const [hoveredId, setHoveredId] = useState(null)
  const { data: special = [], isLoading } = useQuery({
    queryKey: ['carts'],
    queryFn: async () => {
      const result = await axios.get('https://bangladesh-adv-server.vercel.app/all-carts')
      return result.data
    }
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const specials = special.filter(items => items.highlight === 'Best Seller')

  const handleMouseEnter = id => {
    setHoveredId(id)
  }

  const handleMouseLeave = () => {
    setHoveredId(null)
  }

  const handleMouseMove = event => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  }

  const handleTouchMove = event => {
    const touch = event.touches[0]
    setMousePosition({ x: touch.clientX, y: touch.clientY })
  }

  if (isLoading) {
    return <p className='text-center text-lg font-medium'>Loading...</p>
  }

  return (
    <div>
      <div className='w-full my-12 font-ranch flex items-start flex-col'>
        <div className='w-full'>
          <div>
            {specials.map((data, index) => (
              <motion.div
                key={data._id}
                onMouseEnter={() => handleMouseEnter(data._id)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onTouchStart={() => handleMouseEnter(data._id)}
                onTouchEnd={handleMouseLeave}
                onTouchMove={handleTouchMove}
                className={`flex w-full bg-red justify-between hover:text-white items-center py-4 cursor-pointer relative bg-transparent ${
                  index !== special.length - 1 ? 'border-b-2' : ''
                }`}
              >
                <h1 className='text-xl z-[888] md:text-3xl p-4 lg:text-6xl font-semibold'>
                  <small className='text-sm mr-2'>0.{index + 1}</small>
                  {data.category}
                </h1>
                <Link to={`/adventures/${data._id}`}>
                  <button className='btn bg-white text-black md:mr-12 relative z-[888]'>
                    <FaArrowRight></FaArrowRight>
                  </button>
                </Link>
                <AnimatePresence>
                  {hoveredId === data._id && (
                    <motion.div
                      initial={{ opacity: 0, height: '1px' }}
                      animate={{ opacity: 1, height: '100%' }}
                      exit={{ opacity: 0, height: '1px' }}
                      transition={{ duration: 0.2 }}
                      className='absolute bg-green-500 w-full h-full z-0'
                    />
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {hoveredId === data._id && (
                    <motion.img
                      src={data.image}
                      alt={data.name}
                      className='fixed top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 z-50 object-cover pointer-events-none w-72 h-96 shadow-lg opacity-50'
                      style={{
                        top: mousePosition.y + 10,
                        left: mousePosition.x + 10
                      }}
                      initial={{ opacity: 0, height: '1px' }}
                      animate={{ opacity: 0.5, height: '350px' }}
                      exit={{ opacity: 0, height: '1px' }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdventurePlace

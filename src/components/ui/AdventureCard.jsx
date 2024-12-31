import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import 'aos/dist/aos.css'
function AdventureCard ({ adventure }) {
  const { _id, title, image, category, shortDescription, ecoFriendlyFeatures } =
    adventure

  return (
    <motion.div
      className='bg-white shadow-lg overflow-hidden transition-transform transform '
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='relative'>
        <img src={image} alt={title} className='w-full h-48 object-cover' />
        <div className='absolute top-2 left-2 bg-green-500 text-white text-xs uppercase px-3 py-1 rounded-full shadow-md'>
          {category}
        </div>
      </div>
      <div className='p-5'>
        <h3 className='text-xl font-extrabold text-gray-800'>{title}</h3>
        <p className='text-sm text-gray-600 mt-2'>{shortDescription}</p>
        <div className='mt-4 space-y-2'>
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
        <Link
          to={`/adventures/${_id}`}
          className='mt-6 rounded-none inline-block w-full text-center px-4 py-3 text-sm font-bold text-white bg-green-500 shadow-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500'
        >
          Explore Now
        </Link>
      </div>
    </motion.div>
  )
}

export default AdventureCard

import Marquee from 'react-fast-marquee'
import { motion } from 'framer-motion'
const imageShowcase = [
  {
    img: 'https://cdn.pixabay.com/photo/2019/12/12/15/14/bangladesh-4690975_960_720.jpg',
    name: 'bangladesh_img'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2021/02/12/16/08/children-6008967_960_720.jpg',
    name: 'village_img'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2018/09/12/22/43/bangladesh-3673378_1280.jpg',
    name: 'river_img'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2019/12/12/15/14/bangladesh-4690975_960_720.jpg',
    name: 'bangladesh_img'
  }
]

const BannerText = {
  heading: "Discover the Thrill of Bangladesh's Adventures",
  subheading:
    "Embark on an unforgettable journey through Bangladesh's breathtaking landscapes. From lush hills to serene rivers, adventure awaits at every turn.",
  buttons: ['Explore', 'Learn More']
}

function renderMarquee (images, direction = 'left') {
  return (
    <Marquee gradient={false} direction={direction} className='mt-4'>
      <div className='flex gap-4'>
        {images.map((item, idx) => (
          <img
            src={item.img}
            key={idx}
            alt={item.name}
            className='h-40 sm:h-48 md:h-56 object-cover rounded-lg shadow-md'
          />
        ))}
      </div>
    </Marquee>
  )
}

function Banner () {
  return (
    <div className='flex mt-12 flex-col items-center justify-center py-12 px-4 sm:px-8 md:px-16 lg:px-24'>
      <motion.h1
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full lg:w-8/12 text-center uppercase font-black'
      >
        {BannerText.heading}
      </motion.h1>
      <motion.p
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        className='text-sm sm:text-base md:text-lg lg:text-xl lg:w-1/2 text-center mt-4'
      >
        {BannerText.subheading}
      </motion.p>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        className='flex flex-wrap justify-center gap-4 mt-6'
      >
        {BannerText.buttons.map((btn, idx) => (
          <button
            key={idx}
            className={`btn px-6 py-2 rounded-md ${
              idx === 0
                ? 'bg-black text-white'
                : 'bg-white border border-gray-300'
            }`}
          >
            {btn}
          </button>
        ))}
      </motion.div>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        className='mt-8 w-full'
      >
        {renderMarquee(imageShowcase)}
        {renderMarquee(imageShowcase, 'right')}
      </motion.div>
    </div>
  )
}

export default Banner

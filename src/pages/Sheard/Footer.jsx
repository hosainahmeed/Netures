import { useEffect } from 'react'
import { motion } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin
} from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  const navigate = useNavigate()

  return (
    <footer className='bg-gray-100 py-8 mt-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <motion.div data-aos='fade-up' className='space-y-4'>
            <div
              onClick={() => navigate('/')}
              className='cursor-pointer flex items-center gap-2'
            >
              <div className='w-8 md:w-12 md:h-12 overflow-hidden'>logo</div>
              <h1 className='md:text-2xl font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-300'>
                EcoQuest
              </h1>
            </div>
            <p className='text-gray-600'>
              Join our newsletter to stay up to date on features and releases.
            </p>
            <div className='flex'>
              <input
                type='email'
                placeholder='Your Email Here'
                className='p-2 border border-gray-300 rounded-l-lg focus:outline-none w-full'
              />
              <button className='p-2 bg-green-500 text-white rounded-r-lg'>
                Join
              </button>
            </div>
            <p className='text-xs text-gray-500'>
              By subscribing you agree to our{' '}
              <Link to='/privacy-policy' className='underline'>
                Privacy Policy
              </Link>
              .
            </p>
          </motion.div>

          <motion.div data-aos='fade-up' className='space-y-2'>
            <h3 className='font-semibold'>Quick Links</h3>
            <ul className='text-gray-600 space-y-1'>
              <li>
                <Link
                  smooth={true}
                  duration={500}
                  offset={-50}
                  to='blog'
                  className='hover:text-gray-800 cursor-pointer'
                >
                  Adventure Blog
                </Link>
              </li>
              <li>
                <Link
                  smooth={true}
                  duration={500}
                  offset={-50}
                  to='tips'
                  className='hover:text-gray-800 cursor-pointer'
                >
                  Eco Tips
                </Link>
              </li>
              <li>
                <Link
                  smooth={true}
                  duration={500}
                  offset={-50}
                  to='contact'
                  className='hover:text-gray-800 cursor-pointer'
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  smooth={true}
                  duration={500}
                  offset={-50}
                  to='about'
                  className='hover:text-gray-800 cursor-pointer'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  smooth={true}
                  duration={500}
                  offset={-50}
                  to='faqs'
                  className='hover:text-gray-800 cursor-pointer'
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div data-aos='fade-up' className='space-y-2'>
            <h3 className='font-semibold'>Follow Us</h3>
            <div className='flex space-x-4 text-gray-600'>
              <NavLink to='/facebook' className='hover:text-blue-600'>
                <FaFacebookF size={20} />
              </NavLink>
              <NavLink to='/instagram' className='hover:text-pink-500'>
                <FaInstagram size={20} />
              </NavLink>
              <NavLink to='/twitter' className='hover:text-blue-400'>
                <FaTwitter size={20} />
              </NavLink>
              <NavLink to='/youtube' className='hover:text-red-500'>
                <FaYoutube size={20} />
              </NavLink>
              <NavLink to='/linkedin' className='hover:text-blue-700'>
                <FaLinkedin size={20} />
              </NavLink>
            </div>
          </motion.div>

          <motion.div data-aos='fade-up' className='space-y-2'>
            <h3 className='font-semibold'>Resources</h3>
            <ul className='text-gray-600 space-y-1'>
              <li>
                <Link
                  to='/privacy-policy'
                  className='hover:text-gray-800 cursor-pointer'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to='/terms-of-service'
                  className='hover:text-gray-800 cursor-pointer'
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to='/cookies-settings'
                  className='hover:text-gray-800 cursor-pointer'
                >
                  Cookies Settings
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className='mt-8 border-t border-gray-200 pt-4 text-center text-gray-600 text-sm'>
          © 2024 Eco-Adventure Experiences. All rights reserved.{' '}
          <Link
            to='/privacy-policy'
            className='underline hover:text-gray-800 cursor-pointer'
          >
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link
            to='/terms-of-service'
            className='underline hover:text-gray-800 cursor-pointer'
          >
            Terms of Service
          </Link>{' '}
          |{' '}
          <Link
            to='/cookies-settings'
            className='underline hover:text-gray-800 cursor-pointer'
          >
            Cookies Settings
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

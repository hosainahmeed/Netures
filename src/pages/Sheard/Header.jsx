import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Button } from 'antd'
import useAuth from '../../hook/useAuth'
function Header () {
  const { user, logOut } = useAuth()
  const location = useLocation()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)

  const handleLogout = () => {
    logOut()
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  const isActiveRoute = path => location.pathname === path

  return (
    <header className='flex relative mb-4 items-center z-[999] py-4 justify-between px-6 dark:bg-[#222] md:px-10 lg:px-16'>
      {/* Logo */}
      <Link
        to={'/'}
        className='text-sm md:text-xl flex md:items-center md:flex-row flex-col font-bold dark:text-white'
      >
        <img
          className='w-12 h-12 object-cover'
          src={
            'https://images.squarespace-cdn.com/content/v1/568ae9abb204d5dfaa7df35f/1456274454739-7UGVIMDKBXDJPQI7HT9A/PATCH-BLK.ico'
          }
          alt='Easy Serve'
        />
        <h1>Wilder Route</h1>
      </Link>

      {/* Navigation Links */}
      <nav className='hidden md:flex items-center gap-6'>
        <Link
          to='/'
          className={`dark:text-white hover:text-green-600 transition ${
            isActiveRoute('/') ? 'text-green-600 font-semibold' : ''
          }`}
        >
          Home
        </Link>
        <Link
          to='/all-place'
          className={`dark:text-white hover:text-green-600 transition ${
            isActiveRoute('/all-place') ? 'text-green-600 font-semibold' : ''
          }`}
        >
          Travele place
        </Link>

        {user ? (
          <div className='relative group'>
            <button
              onClick={() => setShowDropDown(!showDropDown)}
              className='dark:text-white hover:text-green-600 flex items-center transition'
            >
              Dashboard
              <MdKeyboardArrowDown
                className={`transition-all ${
                  showDropDown ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showDropDown && (
              <div className='absolute top-full w-48 left-0 mt-2 dark:bg-[#222] bg-white rounded-md shadow-md transition-opacity'>
                {['Add Travele', 'Manage Travele', 'Booked Traveles'].map(
                  (item, index) => (
                    <Link
                      key={index}
                      to={`/dashboard/${item.toLowerCase().replace(/ /g, '-')}`}
                      className={`block px-4 py-2 dark:text-white hover:bg-green-500 hover:text-white dark:hover:bg-gray-900 transition ${
                        isActiveRoute(
                          `/dashboard/${item.toLowerCase().replace(/ /g, '-')}`
                        )
                          ? 'bg-green-500 text-white hover:bg-green-700'
                          : ''
                      }`}
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        ) : (
          <div className='flex gap-2 items-center'>
            <Link
              to='/login'
              className={`dark:text-white hover:text-green-600 transition ${
                isActiveRoute('/login') ? 'text-green-600 font-semibold' : ''
              }`}
            >
              Login
            </Link>
            <Link
              to='/register'
              className={`dark:text-white bg-[#38ff45] rounded-md px-4 py-2 text-white hover:bg-green-400 transition ${
                isActiveRoute('/register') ? 'bg-green-400' : ''
              }`}
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>

      {mobileMenuOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          className='fixed top-0 left-0 w-3/4 h-full bg-white dark:bg-[#222] shadow-lg z-[1000] p-6 flex flex-col gap-4'
        >
          <button
            onClick={toggleMobileMenu}
            className='self-end dark:text-white hover:text-[#384BFF]'
          >
            Close
          </button>
          <Link
            to='/all-place'
            className={`dark:text-white hover:text-green-600 transition ${
              isActiveRoute('/all-place') ? 'text-green-600 font-semibold' : ''
            }`}
            onClick={toggleMobileMenu}
          >
            Travele Place
          </Link>
          {user ? (
            <>
              {[
                'Add Service',
                'Manage Service',
                'Booked Services',
                'Service To-Do'
              ].map((item, index) => (
                <Link
                  key={index}
                  to={`/dashboard/${item.toLowerCase().replace(/ /g, '-')}`}
                  className={`block py-2 dark:text-white hover:bg-gray-100 transition ${
                    isActiveRoute(
                      `/dashboard/${item.toLowerCase().replace(/ /g, '-')}`
                    )
                      ? 'bg-green-500 text-white'
                      : ''
                  }`}
                  onClick={toggleMobileMenu}
                >
                  {item}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleLogout()
                  toggleMobileMenu()
                }}
                className='text-white bg-[#222] p-2 rounded-md hover:text-[#384BFF] transition'
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/login'
              className={`dark:text-white hover:text-green-600 transition ${
                isActiveRoute('/login') ? 'text-green-600 font-semibold' : ''
              }`}
              onClick={toggleMobileMenu}
            >
              Log-in
            </Link>
          )}
        </motion.div>
      )}
      <div className='flex items-center justify-center gap-2'>
        <div className='flex md:hidden items-center gap-2'>
          <button
            onClick={toggleMobileMenu}
            className='dark:text-white hover:text-green-600 focus:outline-none'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </button>
        </div>
        {user && (
          <div>
            <div className='flex items-center gap-2'>
              <Button onClick={() => logOut()} className='md:block hidden'>
                Log out
              </Button>
              <div
                onClick={() => setShowProfile(!showProfile)}
                className='p-1 bg-[#384BFF] flex items-center gap-2 rounded-full cursor-pointer'
                aria-label='Toggle Profile Menu'
              >
                <img
                  src={user?.photoURL || 'https://via.placeholder.com/150'}
                  alt={user?.displayName || 'User Avatar'}
                  className='w-8 h-8 rounded-full object-cover'
                />
              </div>
              <div
                className='flex cursor-pointer items-center gap-1 hover:text-green-600'
                onClick={() => setShowProfile(!showProfile)}
              >
                <h2 className='md:block hidden '>
                  {user?.displayName.slice(0, 10)}
                </h2>
                <MdKeyboardArrowDown
                  className={`transition-all ${
                    showProfile ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </div>
            {showProfile && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                exit={{ y: '-100%' }}
                className='fixed top-0 pointer-events-none left-0 w-full h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-[#222] text-white z-[999] flex flex-col items-center justify-center shadow-2xl overflow-hidden'
              >
                {/* Close Button */}
                <button
                  type='button'
                  className='text-white font-bold pointer-events-auto absolute top-4 left-4 bg-[#384BFF] hover:bg-[#3a4beb] transition-all p-3 rounded-full shadow-lg'
                  onClick={() => setShowProfile(!showProfile)}
                >
                  ✕
                </button>

                {/* Profile Info */}
                <div className='text-center pointer-events-auto flex items-center flex-col'>
                  <motion.img
                    src={user?.photoURL || 'https://via.placeholder.com/150'}
                    alt={user?.displayName || 'User'}
                    className='w-28 h-28 pointer-events-auto object-cover  rounded-full border-4 border-white shadow-xl mb-4'
                    whileHover={{
                      scale: 1.1,
                      rotate: 10
                    }}
                    transition={{
                      duration: 0.3,
                      type: 'spring'
                    }}
                  />
                  <h2 className='text-2xl pointer-events-auto font-extrabold mb-2 tracking-wide'>
                    {user?.displayName || 'Guest'}
                  </h2>
                  <p className='text-lg opacity-70'>
                    {user?.email || 'guest@example.com'}
                  </p>
                </div>
                <Link to={'/update-profile'}>
                  <motion.button
                    onClick={() => setShowProfile(false)}
                    whileHover={{
                      rotateX: 15,
                      rotateY: -15,
                      scale: 1.05
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut'
                    }}
                    className='btn bg-[#384BFF] mt-3 pointer-events-auto hover:bg-[#384BFF] text-white uppercase font-bold text-xl border-none '
                  >
                    Update profile
                  </motion.button>
                </Link>
                {/* Logout Button */}
                <motion.div
                  onClick={() => {
                    logOut()
                    setShowProfile(!showProfile)
                  }}
                  className='mt-10 text-xl pointer-events-auto font-bold  uppercase px-10 py-4  bg-[#384BFF] rounded-lg shadow-xl cursor-pointer transition-transform'
                  whileHover={{
                    rotateX: 15,
                    rotateY: -15,
                    scale: 1.05
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut'
                  }}
                >
                  Log Out
                </motion.div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

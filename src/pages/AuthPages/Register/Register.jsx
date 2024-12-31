import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye } from 'react-icons/fa'
import { FaEyeLowVision, FaGoogle } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import Lottie from 'lottie-react'
import registerAnimation from '../../../../public/register.json'
import useAuth from '../../../hook/useAuth.jsx'
import { Spin } from 'antd'
const Register = () => {
  const [showpass, setShowpass] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const { createUser, googleSignIn, updateUserProfile, loading } = useAuth()
  const navigate = useNavigate()
  const onSubmit = async data => {
    const { email, password, displayName, photoURL } = data
    const userData = { displayName, email, photoURL }
    try {
      await axios.post('http://localhost:5000/user', userData, {
        withCredentials: true
      })

      await createUser(email, password)
      await updateUserProfile({
        displayName,
        photoURL
      })

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have been successfully registered!',
        confirmButtonText: 'Go to Login'
      }).then(() => {
        navigate('/login')
        reset()
      })
    } catch (error) {
      const isConflict = error.response?.status === 409

      Swal.fire({
        icon: isConflict ? 'info' : 'error',
        title: isConflict ? 'Email Already Registered' : 'Registration Failed',
        text: isConflict
          ? 'This email is already registered. Redirecting to login...'
          : error.message || 'An error occurred during registration.',
        confirmButtonText: isConflict ? 'Go to Login' : 'Try Again'
      }).then(() => {
        if (isConflict) navigate('/login')
      })
    }
  }

  const handleGoogleRegister = async () => {
    try {
      const user = await googleSignIn()
      const displayName = user?.displayName || 'Anonymous User'
      const email = user?.email
      const photoURL = user?.photoURL || 'default-photo-url'
      const userData = { displayName, email, photoURL }
      await axios.post('http://localhost:5000/user', userData)
      Swal.fire({
        icon: 'success',
        title: 'Google Sign-In Successful',
        text: 'You have been signed in successfully!',
        confirmButtonText: 'Go to Login'
      }).then(() => {
        navigate('/login')
      })
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: 'info',
          title: 'Email Already Registered',
          text: 'This email is already registered. Redirecting to login...',
          confirmButtonText: 'Go to Login'
        }).then(() => {
          navigate('/login')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-In Failed',
          text: error.message || 'An error occurred during Google sign-in.',
          confirmButtonText: 'Try Again'
        })
      }
    }
  }

  return (
    <div className='relative  bg-center bg-cover bg-no-repeat md: flex flex-col md:flex-row min-h-screen  items-center justify-center gap-12 mx-4'>
      <div className='bg-[#13232f] my-12 z-[999]  p-10 rounded-lg shadow-lg'>
        <div>
          <h1 className='text-center text-white font-light text-3xl mb-4'>
            Sign Up for Free
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex space-x-4 mb-4'>
              <div className='relative w-full'>
                <label className='text-white/50 text-lg'>Name</label>
                <input
                  placeholder=''
                  type='text'
                  {...register('displayName', {
                    message: 'Invalid name',
                    required: 'Name is required'
                  })}
                  className='text-xl w-full p-2 bg-transparent border border-gray-400 text-white focus:outline-none focus:border-[#7AA3FF]'
                  autoComplete='given-name'
                />
                {errors.displayName && (
                  <p className='text-[#7AA3FF] text-sm'>
                    {errors.displayName.message}
                  </p>
                )}
              </div>
            </div>
            <div className='flex space-x-4 mb-4'>
              <div className='relative w-full'>
                <label className='text-white/50 text-lg'>image URL</label>
                <input
                  placeholder=''
                  type='text'
                  {...register('photoURL', {
                    message: 'Invalid name  ',
                    required: 'Image URL required'
                  })}
                  className='text-xl w-full p-2 bg-transparent border border-gray-400 text-white focus:outline-none focus:border-[#7AA3FF]'
                  autoComplete='given-name'
                />
                {errors.photoURL && (
                  <p className='text-[#7AA3FF] text-sm'>
                    {errors.photoURL.message}
                  </p>
                )}
              </div>
            </div>

            <div className='relative mb-4'>
              <label className='text-white/50 text-lg'>Email Address</label>
              <input
                type='email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                className='text-xl w-full p-2 bg-transparent border border-gray-400 text-white focus:outline-none focus:border-[#7AA3FF]'
                autoComplete='email'
              />
              {errors.email && (
                <p className='text-[#7AA3FF] text-sm'>{errors.email.message}</p>
              )}
            </div>

            <div className='relative mb-4'>
              <label className='text-white/50 text-lg'>Set A Password</label>
              <div className='flex items-center justify-between gap-2 border border-gray-400 pr-2'>
                <input
                  type={showpass ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long'
                    },
                    validate: {
                      hasUppercase: value =>
                        /[A-Z]/.test(value) ||
                        'Password must include an uppercase letter',
                      hasLowercase: value =>
                        /[a-z]/.test(value) ||
                        'Password must include a lowercase letter'
                    }
                  })}
                  className='text-xl w-full p-2 bg-transparent text-white focus:outline-none focus:border-[#7AA3FF]'
                  autoComplete='new-password'
                />
                <h1 onClick={() => setShowpass(p => !p)}>
                  {showpass ? (
                    <FaEyeLowVision className='text-[#7AA3FF] text-xl' />
                  ) : (
                    <FaEye className='text-[#7AA3FF] text-xl' />
                  )}
                </h1>
              </div>
              {errors.password && (
                <p className='text-[#7AA3FF] text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='w-full bg-[#7AA3FF] rounded-md text-white p-4 text-2xl font-bold hover:bg-[#7AA3FF] transition-all'
            >
              {loading ? (
                <>
                  <Spin className='mr-2' /> Processing...
                </>
              ) : (
                'Get Started'
              )}
            </button>
          </form>
        </div>
        <div className='flex items-center gap-2 justify-center mt-2 p-2 rounded-md bg-white underline text-[#7AA3FF] cursor-pointer'>
          <FaGoogle></FaGoogle>{' '}
          <span onClick={handleGoogleRegister}>Resgister with Google</span>
        </div>
        <h1 className='text-white text-sm md:text-base mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-[#7AA3FF] hover:underline'>
            Go to login
          </Link>
        </h1>
      </div>
      <Lottie
        className='md:block hidden'
        animationData={registerAnimation}
      ></Lottie>
    </div>
  )
}

export default Register

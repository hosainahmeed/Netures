import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaGoogle } from 'react-icons/fa'
import { FaEyeLowVision } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAuth from '../../../hook/useAuth.jsx'
import Lottie from 'lottie-react'
import loginAnimation from '../../../../public/login.json'
import { Spin } from 'antd'
function Login () {
  const [showpass, setShowpass] = useState(false)
  const { loginUser, googleSignIn, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async data => {
    const { email, password } = data
    try {
      await loginUser(email, password).then(() => {
        Swal.fire({
          title: 'Welcome!',
          text: 'You have successfully logged in.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        })
        reset()
        const redirectTo = location.state?.from?.pathname || '/'
        navigate(redirectTo, { replace: true })
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.message || error}`
      })
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const user = await googleSignIn()
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome, ${user.displayName || 'User'}!`,
        timer: 3000,
        timerProgressBar: true
      }).then(() => {
        const redirectTo = location.state?.from?.pathname || '/'
        navigate(redirectTo, { replace: true })
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Something went wrong!'
      }).then(() => {
        reset()
      })
      console.error('Error during Google Sign-In:', error)
    }
  }

  return (
    <div className='relative min-h-screen bg-no-repeat bg-cover bg-center md:flex flex-col-reverse md:flex-row items-center justify-center gap-12 mx-4'>
      <Lottie className='md:block hidden' animationData={loginAnimation}></Lottie>
      <div className='bg-[#13232f] my-12 z-[999]  p-10 rounded-lg shadow-lg'>
        <h1 className='text-center font-bebas text-white font-light text-3xl mb-10'>
          Welcome Back!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='relative mb-10'>
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

          <div className='relative mb-10'>
            <label className='text-white/50 text-lg'>Set A Password</label>
            <div className='flex items-center justify-between gap-2 border border-gray-400 pr-2'>
              <input
                type={showpass ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 5,
                    message: 'Password must be at least 5 characters'
                  }
                })}
                className='text-xl w-full p-2 bg-transparent text-white focus:outline-none focus:border-[#7AA3FF]'
                autoComplete='new-password'
              />
              <h1 onClick={() => setShowpass(p => !p)}>
                {showpass ? (
                  <FaEyeLowVision className='text-[#7AA3FF] text-xl'></FaEyeLowVision>
                ) : (
                  <FaEye className='text-[#7AA3FF] text-xl'></FaEye>
                )}
              </h1>
            </div>
            {errors.password && (
              <p className='text-[#7AA3FF] text-sm'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* <p className='text-right text-white mb-4'>
            <a href='#' className='hover:text-[#7AA3FF]'>
              Forgot Password?
            </a>
          </p> */}

          <button
            type='submit'
            className='w-full bg-[#7AA3FF] rounded-md text-white p-4 md:text-2xl font-bold hover:bg-[#7AA3FF] transition-all'
          >
            {loading ? (
              <>
                <Spin className='mr-2' /> Processing...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>
        <div
          onClick={handleGoogleLogin}
          className='flex items-center gap-2 justify-center mt-2 p-2 rounded-md bg-white text-[#222] underline hover:text-[#7AA3FF] cursor-pointer'
        >
          <FaGoogle></FaGoogle>
          <span className='text-[#222]'>Login with Google</span>
        </div>
        <h1 className='text-white mt-6'>
          Dont have an account?
          <Link
            to='/register'
            className='text-[#7AA3FF] text-sm md:text-base hover:underline ml-2'
          >
            Go to Sign up
          </Link>
        </h1>
      </div>
    </div>
  )
}

export default Login

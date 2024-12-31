import { Link, useRouteError } from 'react-router-dom'
import errorImage from '../../../public/error.json'
import Lottie from 'lottie-react'

const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div className='mx-auto max-w-screen-xl min-h-screen flex items-center justify-center flex-col'>
      <Lottie className='md:w-1/2 mx-auto' animationData={errorImage}></Lottie>
      <h1 className='text-center text-2xl text-primary'>
        {error.error.message}
      </h1>
      <Link to='/'>
        <button className='btn primary-btn mt-12'>Back To Home</button>
      </Link>
    </div>
  )
}

export default ErrorPage

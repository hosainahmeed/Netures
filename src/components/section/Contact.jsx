import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import SectionTitle from '../ui/SectionTitle'

const contactInfo = [
  {
    label: 'Address',
    info: '4648 Rocky Road Philadelphia PA',
    icon: '📍'
  },
  {
    label: 'Email',
    info: 'info@exmple.com',
    icon: '✉️'
  },
  {
    label: 'Phone',
    info: '+88 0123 654 99',
    icon: '📞'
  }
]

function Contact () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    Swal.fire({
      title: 'Message send success',
      text: `${data.name} we will review you message soon as possible`,
      icon: 'success',
      confirmButtonColor: '#000'
    })
  }

  return (
    <div id='contact' className='pt-28'>
      <SectionTitle
      title={'contact'}
      ></SectionTitle>
      <div className='border-2 border-green-500'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-1/2 p-6 dark:bg-[#222] dark:text-white '>
            <h1 className='text-3xl font-bold mb-4'>My Information</h1>
            <p className='dark:text-white mb-6'>
              Arotech Desires to obtain pain of itself, because it is pain, but
              occasionally circumstances.
            </p>
            <div className='space-y-4'>
              {contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className='flex items-center gap-4 border-b pb-4'
                >
                  <div className='text-xl'>{info.icon}</div>
                  <div>
                    <h2 className='dark:text-white font-semibold'>
                      {info.label}
                    </h2>
                    <p className='text-gray-500'>{info.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full md:w-1/2 p-6 dark:bg-[#222]'
          >
            <div className='mb-6'>
              <label className='block dark:text-white font-bold mb-2'>
                Name
              </label>
              <input
                type='text'
                {...register('name', { requiblue: 'Name is requiblue' })}
                className='w-full p-3 border border-gray-300 bg-white dark:text-[#222] rounded focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              {errors.name && (
                <p className='text-green-500 text-sm'>{errors.name.message}</p>
              )}
            </div>

            <div className='mb-6'>
              <label className='block dark:text-white font-bold mb-2'>
                Email
              </label>
              <input
                type='email'
                {...register('email', {
                  requiblue: 'Email is requiblue',
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: 'Invalid email address'
                  }
                })}
                className='w-full p-3 border border-gray-300 bg-white dark:text-[#222] rounded focus:outline-none focus:ring-2 focus:ring-green-400'
              />
              {errors.email && (
                <p className='text-green-500 text-sm'>{errors.email.message}</p>
              )}
            </div>

            <div className='mb-6'>
              <label className='block dark:text-[#222] font-bold mb-2'>
                Message
              </label>
              <textarea
                {...register('message', { requiblue: 'Message is requiblue' })}
                className='w-full p-3 border border-gray-300 bg-white dark:text-[#222] rounded focus:outline-none focus:ring-2 focus:ring-green-400'
                rows='4'
              ></textarea>
              {errors.message && (
                <p className='text-green-500 text-sm'>
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type='submit'
              className='w-full bg-green-600 text-white font-bold py-3 px-4 rounded hover:bg-green-500 focus:ring-2 focus:ring-green-400 transition duration-200'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact

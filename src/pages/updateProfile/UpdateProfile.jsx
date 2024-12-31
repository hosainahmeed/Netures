import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Lottie from 'lottie-react'
import updateAnime from '../../../public/update.json'
import SectionTitle from '../../components/ui/SectionTitle'
import useAuth from '../../hook/useAuth'

function UpdateProfile () {
  const { users, updateUserProfile } = useAuth()
  const navigate = useNavigate()
  const [newName, setNewName] = useState(users?.displayName || '')
  const [newImage, setNewImage] = useState(null)

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleImageUrlChange = e => {
    setNewImage(e.target.value)
  }

  const handleProfileUpdate = async () => {
    if (newName !== users?.displayName || newImage !== users?.photoURL) {
      const updatedData = { displayName: newName }
      if (newImage) {
        updatedData.photoURL = newImage
      }
      await updateUserProfile(updatedData).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Update Successful',
          text: `Profile Update Successfuly!`,
          timer: 3000,
          timerProgressBar: true
        }).then(() => {
          const redirectTo = location.state?.from?.pathname || '/'
          navigate(redirectTo, { replace: true })
        })
      })
    }
  }

  return (
    <div className='flex justify-center flex-col gap-2 items-center'>
        <SectionTitle
        subTitle={'update your image or name .'}
        title={'Update Profile'}
        ></SectionTitle>
     <div className='flex items-center md:flex-row flex-col-reverse justify-center'>
        <Lottie
        className='hidden md:block'
        animationData={updateAnime}
        ></Lottie>
     <div className='bg-white p-8 rounded-lg  w-full sm:w-96'>
        <div className='mb-4'>
          <label className='block text-gray-700' htmlFor='name'>
            Name
          </label>
          <input
            type='text'
            id='name'
            value={newName}
            onChange={handleNameChange}
            className='mt-2 bg-white text-[#222] p-2 w-full border border-gray-300 rounded-lg'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700' htmlFor='image'>
            Profile Picture (Image URL or Upload)
          </label>
          <input
            type='text'
            id='imageUrl'
            placeholder='Or enter an image URL'
            onChange={handleImageUrlChange}
            value={newImage || ''}
            className='mt-2 p-2 w-full border border-gray-300 rounded-lg'
          />
          {newImage && (
            <div className='mt-4'>
              <img
                src={newImage}
                alt='Profile Preview'
                className='w-20 h-20 rounded-full object-cover'
              />
            </div>
          )}
        </div>

        <button
          onClick={handleProfileUpdate}
          className='w-full bg-[#384BFF]  text-white p-2 rounded-lg mt-4 hover:bg-[#384cffb9]'
        >
          Update Profile
        </button>
      </div>
     </div>
    </div>
  )
}

export default UpdateProfile

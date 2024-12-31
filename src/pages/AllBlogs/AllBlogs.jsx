import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import SectionTitle from '../../components/ui/SectionTitle'

function AllBlogs () {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const navigate = useNavigate()
  const {
    data: blogsData = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const result = await axios.get('http://localhost:5000/all-blogs')
      return result.data
    }
  })
  if (isLoading) {
    return <p>loading</p>
  }

  return (
    <div className='flex items-center flex-col mb-12'>
        <SectionTitle
        subtitle={
          ' Discover our blogs for more information.'
        }
        title={'All Blogs'}
      ></SectionTitle>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-28'>
        {blogsData.map(blog => (
          <div
            key={blog._id}
            className='card shadow-none bg-white rounded-none glass'
          >
            <figure className='h-80 md:h-96'>
              <img
                src={blog.image}
                alt={blog.title}
                className='w-full h-full object-contain md:object-cover'
              />
            </figure>
            <div className='card-body md:px-2 border-[1px] pt-3'>
              <h2 className='card-title text-xl'>{blog.title}</h2>
              <p className='text-gray-800 text-sm leading-4'>
                {blog.publish_date}
              </p>
              <p className='text-gray-800 text-sm leading-4'>
                Read Time : {blog.read_time}
              </p>
              <p className='text-gray-800 text-sm leading-4'>
                Author Name : {blog.author.name}
              </p>
              <p className='text-black text-base'>
                <b>Content :</b> {blog.content.substring(0, 100)}...
              </p>
              <div className='card-actions items-end justify-between mt-4'>
                <button
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                  className='flex items-center gap-2 text-blue-500 hover:underline transition duration-200'
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllBlogs

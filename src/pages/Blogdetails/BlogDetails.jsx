import { useLoaderData } from "react-router"

function BlogDetails() {
    const blog = useLoaderData()
  return (
    <div className="min-h-screen">
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
              </div>
            </div>
          </div>

    </div>
  )
}

export default BlogDetails
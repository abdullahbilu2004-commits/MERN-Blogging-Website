import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import Moment from 'moment';
import toast from 'react-hot-toast';

const Blog = () => {

  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null)
  const [comment, setComments] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  // Fetch single blog data
  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Fetch comments for blog
  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id });
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Add new comment
  const addComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content });
      if (data.success) {
        toast.success(data.message);
        setName('')
        setContent('')
        fetchComments(); // Refresh comments after adding
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [])

  if (!data) return <Loader />

  return (
    <div className='relative'>
      <img src={assets.gradientBackground} className='absolute -top-1 -z-1 opacity-50' alt="" />

      <Navbar />

      <div className='text-center mt-20 text-gray-600'>
        <p className='text-[#5044E5] py-4 font-medium'>
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-[#5044E5]/35
          bg-[#5044E5]/5 font-medium text-[#5044E5]'>
          Michale Brown
        </p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} className='rounded-3xl mb-5' alt="" />
        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: data.description }}></div>

        {/* Comments Section */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comments ({comment.length})</p>
          <div className='flex flex-col gap-4'>
            {comment.map((item, index) => (
              <div key={index} className='relative bg-[#5044E5]/2 border border-[#5044E5]/5 max-w-xl p-4 rounded text-gray-600'>
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.user_icon} className='w-6' alt="" />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Form */}
        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Add your Comment</p>
          <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder='Name'
              className='w-full outline-none p-2 border border-gray-300 rounded'
              required
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className='w-full p-2 border border-gray-300 rounded outline-none h-48'
              required
              placeholder='Comment'
            />
            <button className='text-white bg-[#5044E5] py-2 px-5 text-center' type='submit'>
              Submit
            </button>
          </form>
        </div>

        {/* Social Media Icons */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this article on social media</p>
          <div className='flex gap-4'>
            <img src={assets.facebook_icon} width={50} alt="Facebook" />
            <img src={assets.twitter_icon} width={50} alt="Twitter" />
            <img src={assets.googleplus_icon} width={50} alt="Google Plus" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Blog

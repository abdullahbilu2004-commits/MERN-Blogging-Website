import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked'

const AddBlog = () => {

  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const onSubmithandler = async (e) => {
    e.preventDefault();
    if (!quillRef.current) return;

    try {
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML, // FIXED typo
        category,
        isPublished
      }

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const { data } = await axios.post('/api/blog/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (data.success) {
        toast.success(data.message || "Blog added successfully");
        // reset form
        setImage(null);
        setTitle('');
        setSubTitle('');
        quillRef.current.root.innerHTML = '';
        setCategory('');
        setIsPublished(true);
      } else {
        toast.error(data.message || "Failed to add blog");
      }

    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsAdding(false);
    }
  }

  const generateContent = async () => {
    if(!title) return toast.error('Please enter title')

      try {
        setIsLoading(true);
        const { data } = await axios.post('/api/blog/generate' , {prompt: title})
        if(data.success){
          quillRef.current.root.innerHTML = parse(data.content)
        }
        else
        {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message)
      }
      finally{
        setIsLoading(false)
      }
    
  }

  useEffect(() => {
    // Initialize Quill
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
    }
  }, [])

  return (
    <form onSubmit={onSubmithandler}
      className='flex-1 bg-blue-50/50 overflow-scroll text-gray-600 h-full'>
      <div className='bg-white w-full max-w-3xl shadow rounded p-4 sm:p-10 sm:m-10'>

        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            className='h-16 cursor-pointer rounded mt-2'
            alt="thumbnail"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id='image'
            hidden
            required
          />
        </label>

        <p className='mt-4'>Blog Title</p>
        <input
          type="text"
          required
          placeholder='Type Here'
          className='w-full max-w-lg p-2 border border-gray-300 outline-none rounded mt-2'
          onChange={e => setTitle(e.target.value)}
          value={title}
        />

        <p className='mt-4'>Sub Title</p>
        <input
          type="text"
          required
          placeholder='Type Here'
          className='w-full max-w-lg p-2 border border-gray-300 outline-none rounded mt-2'
          onChange={e => setSubTitle(e.target.value)}
          value={subTitle}
        />

        <p className='mt-4'>Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          {isLoading && ( <div className='absolute right-0 left-0 bottom-0 top-0 flex items-center justify-center
          bg-black/10 mt-2'> 
           <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin '></div>
          </div> )}
          <button
            type='button' disabled={isLoading}
            onClick={generateContent}
            className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'
          >
            Generate with AI
          </button>
        </div>

        <p className='mt-4'>Blog Category</p>
        <select
          required
          onChange={e => setCategory(e.target.value)}
          className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
          value={category}
          name="category"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        <div className='flex gap-4 mt-2 items-center'>
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className='scale-125 cursor-pointer'
            onChange={e => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          disabled={isAdding}
          type='submit'
          className='text-white bg-[#5044E5] mt-8 w-40 h-10 rounded cursor-pointer text-sm'
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  )
}

export default AddBlog

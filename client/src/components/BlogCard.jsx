import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {

const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className="cursor-pointer w-full rounded-lg overflow-hidden 
    shadow hover:scale-102 hover:shadow-[#5044E5]/25 duration-300">
      <img src={image} alt={title} className='aspect-video' />

      <span className='ml-5 inline-block mt-4 px-3 rounded-full bg-[#5044E5]/20 text-[#5044E5] text-sm'> 
        {category} 
      </span>

      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900'> {title} </h5>

        <p className='mb-3 text-xs text-gray-600'>
          {description ? description.replace(/<[^>]+>/g, "").slice(0, 80) : ""}
        </p>
      </div>
    </div>
  )
}

export default BlogCard;

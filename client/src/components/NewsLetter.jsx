import React from 'react'

const NewsLetter = () => {
  return (
    <div className='space-y-2 flex items-center justify-between text-center flex-col'>
        <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss a Blog</h1>
        <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to get the latest blog, new tech, and exclusive news.</p>
        <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
            <input className='border border-gray-300 rounded-md h-full border-r-0 outline-none
            w-full rounded-r-none px-3 text-gray-500 ' type="text" placeholder='Enter your E-mail id' required />
            <button className='md:px-12 px-8 h-full text-white bg-[#5044E5]/80 
            hover:bg-[#5044E5] transition-all cursor-pointer rounded-md rounded-l-none'
             type='submit'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter
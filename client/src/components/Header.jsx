import React, { useRef } from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Header = () => {

 const { setInput , input} = useAppContext();
 const inputRef = useRef();

 const onSubmithandler = async(e)=>{
  e.preventDefault();
  setInput(inputRef.current.value)
 }

 const onClear = ()=>{
  setInput('')
  inputRef.current.value =  ''
 }
  return (
    <div className='mx-8 sm:mx-16 relative xl:mx-24'>

        <div className='text-center mt-20 mb-8'>
         <div className='inline-flex cursor-pointer items-center justify-center gap-4 py-1.5 px-6 
         mb-4 border border-[#5044E5]/60 bg-[#5044E5]/10 rounded-full text-sm text-[#5044E5]'>
            <p>New: Ai feature Integreated</p>
            <img src={assets.star_icon} className='w-2.5' alt="icon" />
         </div>

         <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 
         text-gray-700'>Your Own <span className='text-[#5044E5]'> Blogging </span> <br /> Platform</h1>

         <p className='my-6 sm:my-8 max-w-2xl m-auto msx-sm:text-xs'>
            This is your space to think out loud , to share what matters ,
            and to write without filters. Weather it's one word or a thousand, your story 
            start right here. </p>

            <form  onSubmit={onSubmithandler} className='flex justify-between border border-gray-300 rounded overflow-hidden max-w-lg max-sm:scale-75
            mx-auto bg-white '>
                <input ref={inputRef} type="text" placeholder='Search for blogs' required className='w-full outline-none pl-4' />
                <button className=' bg-[#5044E5] text-white px-8 py-2 m-1.5 rounded 
                hover:scale-105 transition-all cursor-pointer' type='submit'>Search</button>
            </form>

        </div>
       <div className='text-center'>
        {input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm
        shadow-custom-sm cursor-pointer'>
          Clear Search
          </button>}
       </div>


        <img src={assets.gradientBackground} alt="bgImg"  className='absolute -z-1 opacity-50 -top-50'/>

    </div>
  )
}

export default Header
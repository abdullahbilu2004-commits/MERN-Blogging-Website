import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
    

    const { axios , setToken , navigate } = useAppContext() ;
    const logout = ()=>{
        localStorage.removeItem('token')
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null)
        navigate('/')
    }
  return (
    <>
        <div className='flex justify-between items-cebter h-[70px] py-2 border-b border-gray-200 px-4 sm:px-12'>
            <img src={assets.logo} className='cursor-pointer w-32 sm:w-40' 
           onClick={()=> navigate('/')} alt="logo" />
           <button onClick={logout}
            className='text-sm px-10 py-2.5  bg-[#5044E5] text-white rounded-full cursor-pointer'>
            Logout
            </button>
        </div>

        <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar />
        <Outlet />
        </div>
    </>
  )
}

export default Layout
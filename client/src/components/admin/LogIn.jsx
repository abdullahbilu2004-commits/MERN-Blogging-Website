import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const LogIn = () => {

    const { axios, setToken, navigate } = useAppContext(); 

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/admin/login', { email, password });

            if (data.success) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common['Authorization'] = data.token;
                navigate('/admin');   // ✅ Redirect to dashboard
            } 
            else {
                toast.error(data.message);
            }
        } 
        catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-full max-w-sm p-6 border border-[#5044E5]/30 shadow-xl shadow-[#5044E5]/15 rounded-lg '>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full py-6 text-center'>
                        <h1 className='text-3xl font-bold'> 
                          <span className='text-[#5044E5]'>Admin</span> LogIn
                        </h1>
                        <p className='font-light'>
                          Enter your credentials to gain access to admin panel
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                        <div className='flex flex-col'>
                            <label>E-Mail</label>

                            <input 
                              onChange={e => setEmail(e.target.value)} 
                              value={email}
                              className='border-b-2 border-gray-200 mb-6 outline-none p-2'
                              required 
                              type="email" 
                              placeholder='Enter your E-Mail ID' 
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label>Password</label>

                            <input 
                              onChange={e => setPassword(e.target.value)} 
                              value={password}
                              className='border-b-2 border-gray-200 mb-6 outline-none p-2'
                              required 
                              type="password" 
                              placeholder='Enter your Password' 
                            />
                        </div>

                        <button 
                          type='submit' 
                          className='w-full cursor-pointer font-medium text-white 
                          bg-[#5044E5] rounded py-3 hover:bg-[#5044E5]/90 transition-all'
                        >
                          LogIn
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogIn;

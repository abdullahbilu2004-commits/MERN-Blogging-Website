import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import Addblog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import LogIn from './components/admin/LogIn'
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {

  const {token} = useAppContext()
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />

        <Route path='/admin' element={token ? <Layout/> : <LogIn/>}>
          <Route index element={<Dashboard />} />
          <Route path='Addblog' element={<Addblog />} />
          <Route path='ListBlog' element={<ListBlog />} />
          <Route path='Comments' element={<Comments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

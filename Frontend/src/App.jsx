import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Features from './Components/Feature'
import Contact from './Components/Contact'
import LoginUser from './Pages/LoginUser'
import { useState } from 'react'
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FitnessDetail from './Pages/FitnessDetail'
import ProtectedRoute from './ProtectedRoute/ProtectRoute'
import { AnimatePresence } from 'framer-motion'
import Profile from './Pages/Profile'

const App = () => {

  const [onlogin, setonlogin] = useState(false);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />

      {onlogin ? <LoginUser setlogin={setonlogin} /> : null}
      <Routes>
        <Route path='/' element={<Home setlogin={setonlogin} />} />
        <Route path='/about' element={<About />} />
        <Route path='/feature' element={<Features />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/details' element={
          <ProtectedRoute>
            <FitnessDetail />
          </ProtectedRoute>} />

        <Route path='/profile' element={ 
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>}/>
      </Routes>

    </>
  )
}

export default App
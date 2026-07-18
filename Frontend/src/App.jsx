import React from 'react'
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
import PublicRoute from './ProtectedRoute/PublicRoute'
import Profile from './Pages/Profile'
import Dashboard from './Components/Dashboard'
import Excercise from './Components/Excercise'
import ProfileSetting from './Pages/ProfileSetting'

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
        className="!z-[99999]"
      />

      {onlogin ? <LoginUser setlogin={setonlogin} /> : null}
      <Routes>
        <Route path='/' element={
          <PublicRoute>
            <Home setlogin={setonlogin} />
          </PublicRoute>
        } />
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

        <Route path='/progress' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />

        <Route path='/exercises' element={
          <ProtectedRoute>
           <Excercise />
          </ProtectedRoute>} />

        <Route path='/:username' element={
          <ProtectedRoute>
            <ProfileSetting/>
          </ProtectedRoute>} />

      </Routes>

    </>
  )
}

export default App
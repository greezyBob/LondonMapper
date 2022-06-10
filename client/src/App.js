import React, { Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//Components
import NavBar from './components/common/NavBar'
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import MapBox from './components/MapBox'

import Box from '@mui/material/Box'




const App = () => {


  return (
    <Box>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

        </Routes>
      </BrowserRouter>
    </Box>

  )
}

export default App

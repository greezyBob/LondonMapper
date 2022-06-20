import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//Components
import NavBar from './components/common/NavBar'
import Home from './components/Home'
import Journeys from './components/Journeys'
import Footer from './components/common/Footer'


import Box from '@mui/material/Box'






const App = () => {

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/myjourneys' element={<Journeys />} />


          </Routes>
        </BrowserRouter>
      </Box>
      <Box className='footer' sx={{ textAlign: 'center' }}>
        <Footer />
      </Box>
    </Box>
  )
}

export default App

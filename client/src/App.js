import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//Components
import NavBar from './components/common/NavBar'
import Home from './components/Home'
import Journeys from './components/Journeys'


import Box from '@mui/material/Box'






const App = () => {

  return (
    <Box sx={{ height: '100%' }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/myjourneys' element={<Journeys />} />
         

        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App

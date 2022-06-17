import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Logo from '../../styles/images/mapLogo.png'

import Login from '../auth/Login'
import Register from '../auth/Register'

//import helpers
import { userIsAuthenticated } from '../helpers/auth.js'


const NavBar = () => {
  const navigate = useNavigate()



  const [logOpen, setLogOpen] = useState(false)
  const handleLogOpen = () => setLogOpen(true)
  const handleLogClose = () => setLogOpen(false)

  const [regOpen, setRegOpen] = useState(false)
  const handleRegOpen = () => setRegOpen(true)
  const handleRegClose = () => setRegOpen(false)

  const handleLogout = () => {
    window.localStorage.removeItem('londonmapper')
    navigate('/')

  }

  const handleNavigate = () => {
    navigate('/myjourneys')
  }

  const handleNavigateHome = () => {
    navigate('/')
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleNavigateHome}
            >
              <Box as='img' src={Logo} />
            </IconButton>
            <Typography as={Link} to='/' variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LondonMapper
            </Typography>
            {userIsAuthenticated() ?
              <>
                <Button onClick={handleNavigate} color='inherit'>My Journeys</Button>
                <Button onClick={handleLogout} color='inherit'>Logout</Button>
              </>
              :
              <>
                <Button onClick={handleRegOpen} color="inherit">Register</Button>
                <Button onClick={handleLogOpen} color="inherit">Login</Button>
              </>

            }

          </Toolbar>
        </AppBar>
      </Box>
      <Box bgcolor='background.default' sx={{ background: 'black' }} >
        <Login logOpen={logOpen} handleLogClose={handleLogClose} />
        <Register regOpen={regOpen} handleRegClose={handleRegClose} />
      </Box>
    </>
  )
}

export default NavBar
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import TextField from '@mui/material/TextField'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  boxShadow: 24,
  p: 4,
  borderRadius: '25px',
}

export default function Login({ logOpen, handleLogClose }) {


  const navigate = useNavigate()

  // Form data passed by user
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  //Error Handling
  const [errors, setErrors] = useState(false)

  //Save to local storage
  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('londonmapper', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.email && formData.password) {
      try {
        const { data } = await axios.post('api/auth/login/', formData)
        console.log(data.token)
        setTokenToLocalStorage(data.token)

        handleLogClose()
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    } else {
      setErrors(true)
    }
  }

  // ? Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(false)
  }


  return (
    <>
      <Modal
        open={logOpen}
        onClose={handleLogClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors &&
              <Grid item xs={12}>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography sx={{ color: 'red' }}>Unauthorised.</Typography>
                </Container>
              </Grid>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
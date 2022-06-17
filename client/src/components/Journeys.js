import { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

import { getTokenFromLocalStorage, userIsAuthenticated } from './helpers/auth'


import Paper from '@mui/material/Paper'
import { Typography, Container, Divider, Grid, Box } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ArrowRight from '@mui/icons-material/ArrowRightAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import CircleIcon from '@mui/icons-material/Circle'


import bus from '../styles/images/bus.png'
import walking from '../styles/images/walking.png'
import tube from '../styles/images/tube.png'
import nationalRail from '../styles/images/national-rail.png'


const Journeys = () => {

  const navigate = useNavigate()

  const icons = {
    bus: bus,
    walking: walking,
    tube: tube,
    'national-rail': nationalRail,
    overground: tube,
    dlr: tube,
  }

  const [myJourneys, setMyJourneys] = useState('')
  const [deleteJourney, setDeleteJourney] = useState(false)



  //then fetch journeys
  useEffect(() => {
    if (!userIsAuthenticated()) return navigate('/')
    const getData = async () => {
      const { data } = await axios.get('/api/myjourneys/', {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      setMyJourneys(data)
    }
    getData()
  }, [deleteJourney])


  const handleDelete = async (e) => {
    try {
      await axios.delete(`/api/myjourneys/${e.currentTarget.value}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
    deleteJourney ? setDeleteJourney(false) : setDeleteJourney(true)
  }

  const section = {
    height: '100%',
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant='h2' sx={{ mb: 1 }}>
        My Journeys
      </Typography>
      <Divider />
      {myJourneys.length ?
        <Grid container spacing={2} my={2}>
          {myJourneys.map(j => {
            return (
              <Grid item xs={1} md={4} key={j.id} sx={{ height: 'inherit' }}>
                <Paper elevation={3} sx={{ px: 2, py: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography>
                        {j.start}
                      </Typography>
                      <ArrowRight sx={{ mx: 1 }} />
                      <Typography>
                        {j.end}
                      </Typography>
                    </Box>
                    <List dense>
                      {j.legs.map((leg, i) => {
                        return (
                          <ListItem key={uuidv4()} >
                            <ListItemIcon>
                              <Box as='img' src={icons[j.modes[i]]} />
                            </ListItemIcon>
                            <ListItemText primary={`${leg} (${j.times[i]} mins)`} />
                          </ListItem>
                        )
                      })}
                    </List>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                      <Typography >
                        {j.cost > 0 ? `£${j.cost.toString().slice(0, -2)}.${j.cost.toString().slice(-2)}` : '£0.00'}
                      </Typography>
                      <CircleIcon sx={{ mx: 2, width: '10px' }} />
                      <Typography>
                        {j.duration} mins
                      </Typography>
                    </Box>
                    <IconButton value={j.id} onClick={(e) => handleDelete(e)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            )
          })}
        </Grid> :
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography>
            You have not saved any journeys!
          </Typography>
        </Box>}
    </Container>
  )
}



export default Journeys
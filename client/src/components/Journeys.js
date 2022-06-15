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

  const [myJourneys, setMyJourneys] = useState(null)

  //check user is logged in


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
  }, [])

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant='h2' sx={{ mb: 1 }}>
        My Journeys
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {myJourneys ? <Grid container spacing={2}>
        {myJourneys.map(j => {
          return (
            <Grid item xs={1} md={3} key={j.id}>
              <Paper sx={{ px: 2, py: 1 }} >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                        <ListItemText primary={`${leg} ( mins)`} />
                      </ListItem>
                    )
                  })}
                </List>
              </Paper>
            </Grid>
          )
        })}
      </Grid> :
        <Box sx={{ textAlign: 'center' }}>
          <Typography>
            You have not saved any journeys!
          </Typography>
        </Box>}
    </Container>
  )
}



export default Journeys
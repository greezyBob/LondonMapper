import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getTokenFromLocalStorage, userIsAuthenticated } from './helpers/auth'
import axios from 'axios'
import mapboxgl from '!mapbox-gl'
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API

import MapBox from './MapBox'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import CircleIcon from '@mui/icons-material/Circle'
import IconButton from '@mui/material/IconButton'
import DoneIcon from '@mui/icons-material/Done'


import bus from '../styles/images/bus.png'
import walking from '../styles/images/walking.png'
import tube from '../styles/images/tube.png'
import nationalRail from '../styles/images/national-rail.png'
import { indigo } from '@mui/material/colors'






const Home = () => {

  const icons = {
    bus: bus,
    walking: walking,
    tube: tube,
    'national-rail': nationalRail,
    overground: tube,
    dlr: tube,
  }

  //start location seatch state
  const [startSearch, setStartSearch] = useState('')
  const [startLocationOptions, setStartLocationOptions] = useState([])
  const [startLocation, setStartLocation] = useState(null)
  const [startArray, setStartArray] = useState()
  const [startCoords, setStartCoords] = useState()

  //end location search state
  const [endSearch, setEndSearch] = useState('')
  const [endLocationOptions, setEndLocationOptions] = useState([])
  const [endLocation, setEndLocation] = useState(null)
  const [endArray, setEndArray] = useState()
  const [endCoords, setEndCoords] = useState()


  const [mapBounds, setMapBounds] = useState()


  const [journeyHover, setJourneyHover] = useState()

  //tfl state
  const [journeys, setJourneys] = useState()

  



  //start location use effect
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${startSearch}.json?type=poi&bbox=-0.5094,51.2744,0.2643,51.7026&access_token=${mapboxgl.accessToken}`)
      setStartArray(data.features)
      const nameArray = data.features.map(item => item.place_name)
      setStartLocationOptions(nameArray)
    }
    getData()
  }, [startSearch])

  const handleStartChange = (e) => {
    setStartSearch(e.target.value)
  }

  //end location use effect
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${endSearch}.json?type=poi&bbox=-0.5094,51.2744,0.2643,51.7026&access_token=${mapboxgl.accessToken}`)
      setEndArray(data.features)
      const nameArray = data.features.map(item => item.place_name)
      setEndLocationOptions(nameArray)
    }
    getData()
  }, [endSearch])

  const handleEndChange = (e) => {
    setEndSearch(e.target.value)
  }


  //tfl api

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://api.tfl.gov.uk/Journey/JourneyResults/${startCoords}/to/${endCoords}`)
      setJourneys(data.journeys)
    }
    if (!endCoords) return
    getData()
  }, [endCoords])

  const handleBtnClick = () => {
    if (!endLocation || !startLocation) return
    let startLng
    let startLat
    let endLng
    let endLat
    const tempBounds = []
    startArray.forEach(item => {
      if (item.place_name === startLocation) {
        startLng = item.center[1]
        startLat = item.center[0]
        tempBounds.push(item.center)
      }
    })
    endArray.forEach(item => {
      if (item.place_name === endLocation) {
        endLng = item.center[1]
        endLat = item.center[0]
        tempBounds.push(item.center)
      }
    })
    setStartCoords(`${startLng},${startLat}`)
    setEndCoords(`${endLng},${endLat}`)
    setMapBounds(tempBounds)
  }


  const handleMouseOver = (e) => {
    setJourneyHover(e.currentTarget.id)
  }

  const [clickIcon, setClickedIcon] = useState(false)

  const handleIconClick = async (e) => {
    const ind = e.currentTarget.value
    const legArray = []
    const modeArray = []
    journeys[ind].legs.forEach(item => {
      legArray.push(item.instruction.summary) 
      modeArray.push(item.mode.id)
    })
    const journeyData = {
      start: startLocation.slice(0, startLocation.indexOf(',')),
      end: endLocation.slice(0, endLocation.indexOf(',')),
      duration: journeys[ind].duration,
      cost: journeys[ind].fare.totalCost,
      legs: [...legArray],
      modes: [...modeArray],
    }
    // try {
    //   await axios.post('/api/myjourneys/', journeyData, {
    //     headers: {
    //       Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    //     },
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
    // e.currentTarget.classList.add('Mui-disabled')
  }

  return (
    <Container sx={{ mt: 7 }}>
      <Box sx={{ display: 'flex' }}>
        <Box mr={1} >
          <Stack direction="row" spacing={2} mb={1}>
            <Box>
              <Autocomplete
                value={startLocation}
                onChange={(event, newValue) => {
                  setStartLocation(newValue)
                }}
                disablePortal
                options={startLocationOptions}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} value={startSearch} onChange={handleStartChange} label="Start..." />}
              />
            </Box>
            <Box>
              <Autocomplete
                value={endLocation}
                onChange={(event, newValue) => {
                  setEndLocation(newValue)
                }}
                disablePortal
                options={endLocationOptions}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} value={endSearch} onChange={handleEndChange} label="End..." />}
              />
            </Box>
            <Button variant='contained' sx={{ width: '100px' }} onClick={handleBtnClick} >
              Go!
            </Button>
          </Stack>
          <MapBox journeys={journeys} journeyHover={journeyHover} mapBounds={mapBounds} />
        </Box>
        <Stack justifyContent="flex-start" sx={{ width: '100%' }}
          spacing={2}>
          {journeys && journeys.map((journey, index) => {
            return (
              <Accordion key={index} id={index}
                onMouseEnter={e => handleMouseOver(e)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }} >
                    <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
                      {journey.duration} mins
                    </Typography>
                    <CircleIcon sx={{ mx: 2, width: '10px' }} />
                    <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
                      {journey.fare ? `£${journey.fare.totalCost.toString().slice(0, -2)}.${journey.fare.totalCost.toString().slice(-2)}` : '£0.00'}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {journey.legs.map((leg, i) => {
                      return (
                        <ListItem key={uuidv4()} >
                          <ListItemIcon>
                            <Box as='img' src={icons[leg.mode.id]} />
                          </ListItemIcon>
                          <ListItemText primary={`${leg.instruction.summary} (${leg.duration} mins)`} />
                        </ListItem>
                      )
                    })}
                  </List>
                  {userIsAuthenticated() ?
                    <IconButton value={index} onClick={(e) => handleIconClick(e)} sx={{ float: 'right' }}>
                      <AddIcon />
                    </IconButton>
                    : null}
                </AccordionDetails>
              </Accordion>
            )
          })}
        </Stack>
      </Box>
    </Container >
  )
}

export default Home
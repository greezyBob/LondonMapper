import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
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
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'






const Home = () => {



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
      const { data } = await axios.get('https://api.tfl.gov.uk/Journey/JourneyResults/51.55062825,-0.140746/to/51.513744,-0.09837950000000001')
      setJourneys(data.journeys)
      console.log(data.journeys)
    }
    // if (!endCoords) return
    getData()
  }, [endCoords])

  const handleBtnClick = () => {
    if (!endLocation || !startLocation) return
    let startLng
    let startLat
    let endLng
    let endLat
    startArray.forEach(item => {
      if (item.place_name === startLocation) {
        startLng = item.center[1]
        startLat = item.center[0]
      }
    })
    endArray.forEach(item => {
      if (item.place_name === endLocation) {
        endLng = item.center[1]
        endLat = item.center[0]
      }
    })
    console.log(startLng, startLat)
    console.log(endLng, endLat)
    setStartCoords(`${startLng},${startLat}`)
    setEndCoords(`${endLng},${endLat}`)
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 7 }}>
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
                id="combo-box-demo"
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
                id="combo-box-demo"
                options={endLocationOptions}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} value={endSearch} onChange={handleEndChange} label="End..." />}
              />
            </Box>
            <Button variant='contained' sx={{ width: '100px' }} onClick={handleBtnClick} >
              Go!
            </Button>
          </Stack>
          <MapBox />
        </Box>
        <Stack justifyContent="flex-start" sx={{ width: '100%' }}
          spacing={1}>
          {journeys && journeys.map((journey, index) => {
            return (
              <Accordion key={index} sx={{ p: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    Total duration: {journey.duration} mins
                  </Typography>
                  <Typography>
                    Total cost: {journey.fare ? `£${journey.fare.totalCost / 100}` : 'N/A'}
                  </Typography>
                </AccordionSummary>

                <Stack direction='row' alignItems='center' spacing={1}>
                  {journey.legs.map((leg, i) => {
                    return (
                      <>
                        <Typography key={uuidv4()}>
                          <div className={leg.mode.name}>.
                          </div>
                        </Typography>
                        {i + 1 !== journey.legs.length && <ArrowRightAltIcon />}
                      </>
                    )
                  })}
                </Stack>

              </Accordion>
            )
          })}
        </Stack>
      </Box>
    </Container >
  )
}

export default Home
import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl'
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API
import 'mapbox-gl/dist/mapbox-gl.css'



const MapBox = ({ journeys, journeyHover, mapBounds }) => {


  const lineData = []

  const lineColours = {
    'walking': '#90be6d',
    'tube': '#577590',
    'bus': '#f94144',
    'national-rail': '#cb997e',
    'tflrail': '#577590',
    'dlr': '#219ebc',
    'tram': '#023047',
    'overground': '#577590',
  }

  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-0.1253)
  const [lat, setLat] = useState(51.5072)
  const [zoom, setZoom] = useState(10.32)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })
  })


  if (parseInt(journeyHover)) {
    journeys[journeyHover].legs.forEach(leg => {
      const line = JSON.parse(leg.path.lineString)
      const reverseLine = line.map(coords => coords.reverse())
      lineData.push(reverseLine)
    })
  }

  useEffect(() => {
    if (!journeyHover || !parseInt(journeyHover)) return
    for (const [key, value] of Object.entries(map.current.style._layers)) {
      parseFloat(key) ? map.current.removeLayer(value.id) : null
    }
    lineData.forEach((points, i) => {
      if (map.current.getSource(points[0][0])) {
        map.current.removeSource(points[0][0])
      }
      map.current.addSource(points[0][0], {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': points,
          },
        },
      })
      map.current.addLayer({
        'id': `${points[0][0]}`,
        'type': 'line',
        'source': `${points[0][0]}`,
        'layout': {
          'line-join': 'round',
          'line-cap': 'round',
        },
        'paint': {
          'line-color': lineColours[journeys[journeyHover].legs[i].mode.id],
          'line-width': 6,
          'line-opacity': 0.8,
        },
      })
    })
  }, [journeyHover])

  useEffect(() => {
    if (!mapBounds) return
    map.current.fitBounds(mapBounds, {
      padding: 50,
    })

  },[mapBounds])




  return (

    <div ref={mapContainer} className="map-container">
    </div>

  )
}

export default MapBox
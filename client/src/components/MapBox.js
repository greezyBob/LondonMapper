import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl'
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API
import 'mapbox-gl/dist/mapbox-gl.css'



const MapBox = () => {

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



  return (

    <div ref={mapContainer} className="map-container"></div>

  )
}

export default MapBox
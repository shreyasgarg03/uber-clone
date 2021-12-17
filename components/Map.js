import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin } from '../slices/navSlice'
import { GOOGLE_MAPS_APIKEY } from '@env'

import tw from 'tailwind-react-native-classnames'
import MapViewDirections from 'react-native-maps-directions'
import { setTravelTimeInfo } from '../slices/navSlice'

const Map = () => {
  const dispatch = useDispatch()
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null)

  useEffect(() => {
    if (origin === null || destination === null) return
    // zoom to the mrakers //
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    })
  }, [origin, destination])

  useEffect(() => {
    if (!origin || !destination) return
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInfo(data.rows[0].elements[0]))
        })
    }
    getTravelTime()
  }, [origin, destination, GOOGLE_MAPS_APIKEY])
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          lineDashPattern={[1]}
          origin={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          destination={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor='black'
          strokeWidth={5}
          mode='DRIVING'
          language='en'
        />
      )}
      {origin && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title={'origin'}
          description={origin.description}
          identifier='origin'
        />
      )}
      {origin && destination && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title={'destination'}
          description={destination.description}
          identifier='destination'
        />
      )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})

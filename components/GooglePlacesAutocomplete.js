import React from 'react'
import { ScrollView } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

// env variables //
import { GOOGLE_MAPS_APIKEY } from '@env'

const GooglePlacesAutocompleteComponent = () => {
  return (
    <GooglePlacesAutocomplete
      nearbyPlacesAPI='GooglePlacesSearch'
      debounce={400}
      placeholder='Where From'
      styles={{
        container: {
          flex: 0,
        },
        textInput: {
          fontSize: 18,
        },
      }}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
      }}
      minLength={2}
      enablePoweredByContainer={false}
      fetchDetails={true}
      onPress={(data, details = null) => {
        console.log(data)
      }}
    />
  )
}

export default GooglePlacesAutocompleteComponent

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Touchable,
} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import GooglePlacesAutocompleteComponent from '../components/GooglePlacesAutocomplete'
import NavOptions from '../components/NavOptions'

// Map Input
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

// env variables //
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import NavFavorites from '../components/NavFavorites'

const HomeScreen = () => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
          source={{
            uri: `https://links.papareact.com/gzs`,
          }}
        />
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
          returnKeyType={'search'}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            )
            dispatch(setDestination(null))
          }}
        />
        <NavOptions />
        <NavFavorites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
})

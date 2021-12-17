import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import tw from 'tailwind-react-native-classnames'

import { GOOGLE_MAPS_APIKEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/core'
import NavFavorites from './NavFavorites'

import { Icon } from 'react-native-elements'

const NavigationCard = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View>
        <Text style={tw`text-center py-2 text-sm`}>Yo Card!!</Text>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <GooglePlacesAutocomplete
            styles={toInputBoxStyles}
            placeholder='Where To?'
            debounce={400}
            enablePoweredByContainer={false}
            nearbyPlacesAPI='GooglePlacesSearch'
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              )
              navigation.navigate('RideOptions')
            }}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
          />
        </View>
        <View style={tw`items-center`}>
          <NavFavorites />
        </View>
      </View>
      <View
        style={tw`flex-row justify-evenly py-2  border-t border-gray-100 my-auto`}
      >
        <TouchableOpacity
          style={tw`flex flex-row bg-black w-24 px-4 py-2 rounded-full justify-between `}
          onPress={() => navigation.navigate('RideOptions')}
        >
          <Icon name='car' type='font-awesome' color='white' size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-black flex flex-row w-24 px-4 py-2 rounded-full justify-between`}
        >
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color='white'
            size={16}
          />
          <Text style={tw`text-white text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigationCard

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
})

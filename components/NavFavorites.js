import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { setOrigin, setDestination } from '../slices/navSlice'

// Tailwind //
import tw from 'tailwind-react-native-classnames'

const data = [
  {
    id: '123',
    icon: 'home',
    location: 'Sector 16d, Chandigarh',
    destination: 'Saffron Chariot ',
  },
  {
    id: '245',
    icon: 'briefcase',
    location: 'Saffron Chariot',
    destination: 'Sector 16d, chandigarh',
  },
]

const NavFavorites = () => {
  const dispatch = useDispatch()

  const setOriginAndDestination = (location, destination) => {}
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
          onPress={() => setOriginAndDestination(location, destination)}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type='ionicon'
            color='white'
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500 text-sm`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavFavorites

const styles = StyleSheet.create({})

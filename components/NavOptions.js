import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'

// data //
import { data } from '../Data/NavOptions'
import { selectOrigin } from '../slices/navSlice'

const NavOptions = () => {
  const origin = useSelector(selectOrigin)
  const navigation = useNavigation()
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`p-2 pt-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          onPress={() => navigation.navigate(item.screen)}
          disabled={!origin}
        >
          <View style={tw`${!origin && 'opacity-90'}`}>
            <Image
              source={{
                uri: item.image,
              }}
              style={{ width: 120, height: 120, resizeMode: 'contain' }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
          </View>
          <Icon
            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
            type='antdesign'
            name='arrowright'
            color='white'
          />
        </TouchableOpacity>
      )}
    />
  )
}

export default NavOptions

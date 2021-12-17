import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInfo } from '../slices/navSlice'

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'Uber-XL-456',
    title: 'UberXL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'Uber-LUX-789',
    title: 'UberLUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
]

const calcFare = () => {
  new Intl.NumberFormat('en-gb', {
    style: 'currency',
    currency: 'GBP',
  }).format(travelTimeInfo?.duration?.value * search_charge_rate * multiplier) /
    100
}

const search_charge_rate = 1.5

const RideOptions = () => {
  const [selected, setSelected] = useState()
  const [fare, setFare] = useState(0)
  const navigation = useNavigation()
  const travelTimeInfo = useSelector(selectTravelTimeInfo)

  // calculate the fare //
  const getCalculatedFare = (item) => {
    const calcFare = (
      travelTimeInfo?.distance?.text.split(' ')[0] *
      search_charge_rate *
      1.6 *
      12 *
      item.multiplier
    ).toFixed()
    return calcFare
  }
  return (
    <View>
      <View
        style={tw`flex-row justify-between items-center pl-8 pr-20 bg-black`}
      >
        <TouchableOpacity
          style={tw`text-center `}
          onPress={() => navigation.navigate('NavigateCard')}
        >
          <Icon name='chevron-left' type='font-awesome' color='white' />
        </TouchableOpacity>
        <Text style={tw` text-center text-xl py-5 text-white`}>
          Select A Ride - {travelTimeInfo?.distance.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`flex-row items-center justify-between px-10 ${
              item.id === selected?.id && 'bg-gray-200'
            }`}
            onPress={() => {
              setSelected(item)
              setFare(
                (
                  travelTimeInfo?.distance?.text.split(' ')[0] *
                  search_charge_rate *
                  1.6 *
                  12 *
                  item.multiplier
                ).toFixed()
              )
            }}
          >
            <Image
              style={{
                width: 78,
                height: 78,
                resizeMode: 'contain',
              }}
              source={{ uri: item.image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`font-semibold text-xl`}>{item.title}</Text>
              <Text>{travelTimeInfo?.duration.text} - Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>{`${getCalculatedFare(item)}₹`}</Text>
          </TouchableOpacity>
        )}
      />
      {/*  */}
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-200'}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title} - {fare}₹
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RideOptions

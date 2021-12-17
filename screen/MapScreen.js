import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

// tailwind //
import tw from 'tailwind-react-native-classnames'

// components //
import Map from '../components/Map.js'
import NavigationCard from '../components/NavigationCard.js'
import RideOptions from '../components/RideOptions'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
const MapScreen = () => {
  const navigation = useNavigation()

  const Stack = createStackNavigator()
  return (
    <View style={tw`py-4`}>
      <View style={styles.hamberger}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Icon name='menu' color='gray' size={32} />
        </TouchableOpacity>
      </View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name='NavigateCard'
            component={NavigationCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='RideOptions'
            component={RideOptions}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  hamberger: {
    position: 'absolute',
    zIndex: 200,
    top: 48,
    left: 28,
    padding: 3,
    borderRadius: 6,
    backgroundColor: 'white',
    elevation: 10,
  },
})

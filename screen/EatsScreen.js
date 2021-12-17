import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

// tailwind //
import tw from 'tailwind-react-native-classnames'

const EatsScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5 mt-5 mx-auto`}>
        <Text>I'm the uber eats screen!!</Text>
      </View>
    </SafeAreaView>
  )
}

export default EatsScreen

const styles = StyleSheet.create({})

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Body from './components/Body/Body'
import Player from './components/Player/Player'
import Footer from './components/Footer/Footer'
import { Provider } from 'react-redux'
import storeConfig from './store/storeConfig'

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={storeConfig}>
        <View style={styles.body}>
          <Body />
          <Player />
          <Footer />
        </View>
      </Provider>
    </ SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    backgroundColor: '#141414'
  },
  body: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

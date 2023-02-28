import React, { useEffect } from 'react'
import { ImageBackground, View, BackHandler } from 'react-native'
import NetworkGraph from './NetworkGraph/NetworkGraph'
import { connect } from 'react-redux'
import styles from './graphStyle'
import { bodyHome } from '../../store/actions/bodyAction'

const backgroundImage = '../../assets/backgroundImages/Graph.png'

const Graph = props => {

  const goToMainScreen = () => {
    props.dispatch(bodyHome())
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", goToMainScreen);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", goToMainScreen);
    }
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require(backgroundImage)}
        opacity={0.3}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <NetworkGraph
          artistName={props.artistName}
          artistMbid={props.artistMbid}
          similarArtists={props.similarArtists}
        />
      </ImageBackground>
    </View>
  )
}


const mapStateToProps = (state) => {
  return {
    artistName: state.search.artistName,
    artistMbid: state.search.artistMbid
  }
}

export default connect(mapStateToProps)(Graph)
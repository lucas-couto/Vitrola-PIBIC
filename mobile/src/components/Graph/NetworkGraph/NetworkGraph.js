import React from "react"
import { View, Text, Pressable, Image } from "react-native"
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { bodyHome } from '../../../store/actions/bodyAction'
import graphAction from "../../../store/actions/graphAction"
import coordinates from "./config/coordinates";
import api from "../../../store/api";
import styles from './networkGraphStyle'

const getNewArtist = async (props, artistMbid, index) => {
  props.dispatch({ type: 'LOADING_GRAPH' })
  props.dispatch(await graphAction(null, artistMbid))
}

const PrincipalNode = (artist, index) => (
  <View key={artist.mbid}
    style={{
      transform: [{ translateX: coordinates[index].x }, { translateY: coordinates[index].y }],
      flexShrink: 2
    }}>
    <Image
      style={{
        borderRadius: 30,
        width: coordinates[index].width,
        height: coordinates[index].height
      }}
      source={{ uri: `${artist.image}` }}
    />
  </View>
)

const NormalNode = (props, artist, index) => (
  <View key={artist.mbid}
    style={{
      transform: [{ translateX: coordinates[index].x }, { translateY: coordinates[index].y }],
      flexShrink: 2
    }}>
    <Pressable onPress={() => getNewArtist(props, artist.mbid, index)}>
      <Image
        style={{
          borderRadius: 30,
          width: coordinates[index].width,
          height: coordinates[index].height
        }}
        source={{ uri: `${artist.image}` }}
      />
    </Pressable>
  </View>
)

const Node = (props, artist, index) => {
  if (index != 0)
    return (
      NormalNode(props, artist, index)
    )
  else
    return (
      PrincipalNode(artist, index)
    )
}

const Nodes = (similarArtists, props) => {
  return (
    similarArtists.map((artist, index) => {
      return Node(props, artist, index)
    })
  )
}

const NetworkGraph = props => (
  <View style={styles.container}>
    <View style={styles.back}>
      <Pressable onPress={() => props.dispatch(bodyHome())}>
        <FontAwesomeIcon icon={faArrowLeft} style={styles.iconStyle} size={30} />
      </Pressable>
    </View>
    <View style={styles.title}>
      <Text style={{ fontSize: 30, color: '#fff' }}>Rede de Artistas</Text>
      <Text style={{ fontSize: 25, color: '#fff' }}>{props.similarArtists[0].name}</Text>
    </View>
    <View style={styles.node}>
      {Nodes(props.similarArtists, props)}
    </View>
  </View>
)

const mapStateToProps = (state) => {
  return {
    principalArtist: state.graph.principalArtist,
    similarArtists: state.graph.similarArtists,
    artistMbid: state.search.artistMbid,
  }
}

export default connect(mapStateToProps)(NetworkGraph)
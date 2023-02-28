import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, Pressable, Image } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faProjectDiagram, faUser, faMusic } from '@fortawesome/free-solid-svg-icons'
import { bodyArtist, bodyGraph, bodyFavorites } from '../../store/actions/bodyAction'
import { connect } from 'react-redux'
import api from '../../store/api'
import styles from './footerStyle'

const Footer = props => {
    const [inOnColor, setInOnColor] = useState('grey')
    useEffect(() =>{
        if(props.artistMbid)
            setInOnColor('#fff')
        else
            setInOnColor('grey')
    }, [props.artistMbid])
    return (
        <View style={styles.container}>
            <View style={styles.icons}>
                {/* GRAFO */}
                <Pressable disabled={!props.artistMbid} onPress={() => props.dispatch(bodyGraph())}>
                    <View style={styles.icon}>
                        <FontAwesomeIcon icon={faProjectDiagram} style={{color: inOnColor}} size={30} />
                        <Text style={{...styles.iconText, color: inOnColor}}>Rede</Text>
                    </View>
                </Pressable>
                {/* ARTISTA */}
                <Pressable disabled={!props.artistMbid} onPress={() => props.dispatch(bodyArtist())}>
                    <View style={{ ...styles.icon }}>
                        {props.artistMbid ? (
                            <Image
                                source={{ uri: `${props.artistImage}` }}
                                style={styles.image}
                                onError={e => { e.target.source = { uri: `${api}/image?imageDirectory=/artist/principalArtistIcon.png` } }}
                            />
                        ) : (
                            <FontAwesomeIcon icon={faUser} style={{color: inOnColor}} size={30} />
                        )}
                        <Text style={{...styles.iconText, color: inOnColor}}>
                            {props.artistMbid ? props.artistName : 'Artista'}
                        </Text>
                    </View>
                </Pressable>
                {/* MUSICAS */}
                <Pressable onPress={() => props.dispatch(bodyFavorites())}>
                    <View style={styles.icon}>
                        <FontAwesomeIcon icon={faMusic} style={styles.iconStyle} size={30} />
                        <Text style={styles.iconText}>Favoritas</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        artistName: state.search.artistName,
        artistMbid: state.search.artistMbid,
        artistImage: state.search.artistImage,
        body: state.body
    }
}

export default connect(mapStateToProps)(Footer)